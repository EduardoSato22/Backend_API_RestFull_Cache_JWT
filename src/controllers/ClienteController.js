import { pool } from '../configs/database.js';
import createError from 'http-errors';
import { clearCache } from '../middlewares/cacheMiddleware.js';

export const getClientes = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao buscar clientes: ${error.message}`));
  }
};

export const getClienteById = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return next(createError(404, 'Cliente não encontrado'));
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao buscar cliente: ${error.message}`));
  }
};

export const createCliente = async (req, res, next) => {
  const { nome, sobrenome, email, idade } = req.body;
  
  if (!nome || !sobrenome || !email || !idade) {
    return next(createError(400, 'Todos os campos são obrigatórios'));
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
      [nome, sobrenome, email, idade]
    );
    // Limpa o cache de clientes
    clearCache('/clientes');
    res.status(201).json({ id: result.insertId, nome, sobrenome, email, idade });
  } catch (error) {
    console.error('Erro detalhado:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      next(createError(400, 'Email já cadastrado'));
    } else {
      next(createError(500, `Erro ao criar cliente: ${error.message}`));
    }
  }
};

export const updateCliente = async (req, res, next) => {
  const { nome, sobrenome, email, idade } = req.body;
  
  if (!nome || !sobrenome || !email || !idade) {
    return next(createError(400, 'Todos os campos são obrigatórios'));
  }

  try {
    const [result] = await pool.query(
      'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
      [nome, sobrenome, email, idade, req.params.id]
    );
    if (result.affectedRows === 0) {
      return next(createError(404, 'Cliente não encontrado'));
    }
    // Limpa o cache de clientes
    clearCache('/clientes');
    res.json({ id: req.params.id, nome, sobrenome, email, idade });
  } catch (error) {
    console.error('Erro detalhado:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      next(createError(400, 'Email já cadastrado'));
    } else {
      next(createError(500, `Erro ao atualizar cliente: ${error.message}`));
    }
  }
};

export const deleteCliente = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return next(createError(404, 'Cliente não encontrado'));
    }
    // Limpa o cache de clientes
    clearCache('/clientes');
    res.status(204).send();
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao deletar cliente: ${error.message}`));
  }
};

export const patchCliente = async (req, res, next) => {
  const { nome, sobrenome, email, idade } = req.body;
  const id = req.params.id;

  try {
    // Primeiro, busca o cliente atual
    const [current] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (current.length === 0) {
      return next(createError(404, 'Cliente não encontrado'));
    }

    // Prepara os dados atualizados
    const updatedData = {
      nome: nome || current[0].nome,
      sobrenome: sobrenome || current[0].sobrenome,
      email: email || current[0].email,
      idade: idade || current[0].idade
    };

    // Atualiza apenas os campos fornecidos
    const [result] = await pool.query(
      'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
      [updatedData.nome, updatedData.sobrenome, updatedData.email, updatedData.idade, id]
    );

    // Limpa o cache
    clearCache('/clientes');
    res.json({ id, ...updatedData });
  } catch (error) {
    console.error('Erro detalhado:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      next(createError(400, 'Email já cadastrado'));
    } else {
      next(createError(500, `Erro ao atualizar cliente: ${error.message}`));
    }
  }
}; 