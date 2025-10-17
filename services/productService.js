const db = require('../configs/database');

const getAllProducts = async () => {
  const [rows] = await db.execute('SELECT * FROM produtos');
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM produtos WHERE id = ?', [id]);
  return rows[0];
};

const createProduct = async (produto) => {
  const { nome, descricao, preco } = produto;
  const data_atualizado = new Date();
  const [result] = await db.execute(
    'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)',
    [nome, descricao, preco, data_atualizado]
  );
  return { id: result.insertId, ...produto, data_atualizado };
};

const updateProduct = async (id, produto) => {
  const { nome, descricao, preco } = produto;
  const data_atualizado = new Date();
  await db.execute(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?',
    [nome, descricao, preco, data_atualizado, id]
  );
  return { id, ...produto, data_atualizado };
};

const deleteProduct = async (id) => {
  await db.execute('DELETE FROM produtos WHERE id = ?', [id]);
  return { id };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}; 