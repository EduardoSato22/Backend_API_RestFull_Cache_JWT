import { pool } from '../configs/database.js';
import createError from 'http-errors';

export const getProdutos = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    next(createError(500, 'Erro ao buscar produtos'));
  }
};

export const getProdutoById = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return next(createError(404, 'Produto não encontrado'));
    }
    res.json(rows[0]);
  } catch (error) {
    next(createError(500, 'Erro ao buscar produto'));
  }
};

export const createProduto = async (req, res, next) => {
  const { nome, descricao, preco } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
      [nome, descricao, preco]
    );
    res.status(201).json({ id: result.insertId, nome, descricao, preco });
  } catch (error) {
    next(createError(500, 'Erro ao criar produto'));
  }
};

export const updateProduto = async (req, res, next) => {
  const { nome, descricao, preco } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
      [nome, descricao, preco, req.params.id]
    );
    if (result.affectedRows === 0) {
      return next(createError(404, 'Produto não encontrado'));
    }
    res.json({ id: req.params.id, nome, descricao, preco });
  } catch (error) {
    next(createError(500, 'Erro ao atualizar produto'));
  }
};

export const deleteProduto = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return next(createError(404, 'Produto não encontrado'));
    }
    res.status(204).send();
  } catch (error) {
    next(createError(500, 'Erro ao deletar produto'));
  }
}; 