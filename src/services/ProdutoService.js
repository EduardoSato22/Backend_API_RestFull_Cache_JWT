import { pool } from '../configs/database.js';
import { getCache, setCache, clearCache } from '../middlewares/cacheMiddleware.js';

// Função para formatar data para o padrão brasileiro
function formatarData(data) {
  if (!data) return null;
  
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo'
  });

  return formatter.format(new Date(data));
}

// Função para formatar o produto
function formatarProduto(produto) {
  return {
    id: produto.id,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.preco,
    estoque: produto.estoque,
    data_atualizado: formatarData(produto.data_atualizado)
  };
}

export class ProdutoService {
  static async findMinAvailableId() {
    const [rows] = await pool.query('SELECT id FROM produtos ORDER BY id');
    let expectedId = 1;
    
    for (const row of rows) {
      if (row.id !== expectedId) {
        return expectedId;
      }
      expectedId++;
    }
    
    return expectedId;
  }

  static async findAll() {
    const cacheKey = '/produtos';
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      return cachedData.map(formatarProduto);
    }

    const [rows] = await pool.query('SELECT * FROM produtos ORDER BY id');
    const produtosFormatados = rows.map(formatarProduto);
    await setCache(cacheKey, produtosFormatados);
    return produtosFormatados;
  }

  static async findById(id) {
    const cacheKey = `/produtos/${id}`;
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      return formatarProduto(cachedData);
    }

    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (rows.length > 0) {
      const produtoFormatado = formatarProduto(rows[0]);
      await setCache(cacheKey, produtoFormatado);
      return produtoFormatado;
    }
    return null;
  }

  static async create(produtoData) {
    const { nome, descricao, preco, estoque } = produtoData;
    
    // Encontra o menor ID disponível
    const availableId = await this.findMinAvailableId();
    
    // Insere o produto com o ID específico
    await pool.query(
      'INSERT INTO produtos (id, nome, descricao, preco, estoque, data_atualizado) VALUES (?, ?, ?, ?, ?, NOW())',
      [availableId, nome, descricao, preco, estoque]
    );

    // Limpa o cache
    await clearCache('/produtos');
    
    const [novoProduto] = await pool.query('SELECT * FROM produtos WHERE id = ?', [availableId]);
    return formatarProduto(novoProduto[0]);
  }

  static async update(id, produtoData) {
    const { nome, descricao, preco, estoque } = produtoData;
    const [result] = await pool.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ?, data_atualizado = NOW() WHERE id = ?',
      [nome, descricao, preco, estoque, id]
    );

    if (result.affectedRows > 0) {
      const [produtoAtualizado] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
      await clearCache(`/produtos/${id}`);
      await clearCache('/produtos');
      return formatarProduto(produtoAtualizado[0]);
    }
    return null;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      await clearCache(`/produtos/${id}`);
      await clearCache('/produtos');
      return true;
    }
    return false;
  }

  static async patch(id, produtoData) {
    const [current] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    if (current.length === 0) {
      return null;
    }

    const updatedData = {
      nome: produtoData.nome || current[0].nome,
      descricao: produtoData.descricao || current[0].descricao,
      preco: produtoData.preco || current[0].preco,
      estoque: produtoData.estoque || current[0].estoque
    };

    const [result] = await pool.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ?, data_atualizado = NOW() WHERE id = ?',
      [updatedData.nome, updatedData.descricao, updatedData.preco, updatedData.estoque, id]
    );

    if (result.affectedRows > 0) {
      const [produtoAtualizado] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
      await clearCache(`/produtos/${id}`);
      await clearCache('/produtos');
      return formatarProduto(produtoAtualizado[0]);
    }
    return null;
  }
} 