const createError = require('http-errors');
const Produto = require('../models/Produto');
const cache = require('../configs/cache');

class ProdutoController {
  static async listar(req, res, next) {
    try {
      const produtos = await Produto.findAll();
      res.json(produtos);
    } catch (error) {
      next(createError(500, 'Erro ao listar produtos'));
    }
  }

  static async buscarPorId(req, res, next) {
    try {
      const produto = await Produto.findById(req.params.id);
      if (!produto) {
        return next(createError(404, 'Produto não encontrado'));
      }
      res.json(produto);
    } catch (error) {
      next(createError(500, 'Erro ao buscar produto'));
    }
  }

  static async criar(req, res, next) {
    try {
      const { nome, descricao, preco } = req.body;
      
      if (!nome || !descricao || !preco) {
        return next(createError(400, 'Todos os campos são obrigatórios'));
      }

      const id = await Produto.create({ nome, descricao, preco });
      cache.del('__express__/produtos');
      
      res.status(201).json({ id, nome, descricao, preco });
    } catch (error) {
      next(createError(500, 'Erro ao criar produto'));
    }
  }

  static async atualizar(req, res, next) {
    try {
      const { nome, descricao, preco } = req.body;
      
      if (!nome || !descricao || !preco) {
        return next(createError(400, 'Todos os campos são obrigatórios'));
      }

      const sucesso = await Produto.update(req.params.id, { nome, descricao, preco });
      if (!sucesso) {
        return next(createError(404, 'Produto não encontrado'));
      }

      cache.del('__express__/produtos');
      res.json({ id: req.params.id, nome, descricao, preco });
    } catch (error) {
      next(createError(500, 'Erro ao atualizar produto'));
    }
  }

  static async deletar(req, res, next) {
    try {
      const sucesso = await Produto.delete(req.params.id);
      if (!sucesso) {
        return next(createError(404, 'Produto não encontrado'));
      }

      cache.del('__express__/produtos');
      res.status(204).send();
    } catch (error) {
      next(createError(500, 'Erro ao deletar produto'));
    }
  }
}

module.exports = ProdutoController; 