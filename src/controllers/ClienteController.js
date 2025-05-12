const createError = require('http-errors');
const Cliente = require('../models/Cliente');
const cache = require('../configs/cache');

class ClienteController {
  static async listar(req, res, next) {
    try {
      const clientes = await Cliente.findAll();
      res.json(clientes);
    } catch (error) {
      next(createError(500, 'Erro ao listar clientes'));
    }
  }

  static async buscarPorId(req, res, next) {
    try {
      const cliente = await Cliente.findById(req.params.id);
      if (!cliente) {
        return next(createError(404, 'Cliente não encontrado'));
      }
      res.json(cliente);
    } catch (error) {
      next(createError(500, 'Erro ao buscar cliente'));
    }
  }

  static async criar(req, res, next) {
    try {
      const { nome, sobrenome, email, idade } = req.body;
      
      if (!nome || !sobrenome || !email || !idade) {
        return next(createError(400, 'Todos os campos são obrigatórios'));
      }

      const id = await Cliente.create({ nome, sobrenome, email, idade });
      cache.del('__express__/clientes');
      
      res.status(201).json({ id, nome, sobrenome, email, idade });
    } catch (error) {
      next(createError(500, 'Erro ao criar cliente'));
    }
  }

  static async atualizar(req, res, next) {
    try {
      const { nome, sobrenome, email, idade } = req.body;
      
      if (!nome || !sobrenome || !email || !idade) {
        return next(createError(400, 'Todos os campos são obrigatórios'));
      }

      const sucesso = await Cliente.update(req.params.id, { nome, sobrenome, email, idade });
      if (!sucesso) {
        return next(createError(404, 'Cliente não encontrado'));
      }

      cache.del('__express__/clientes');
      res.json({ id: req.params.id, nome, sobrenome, email, idade });
    } catch (error) {
      next(createError(500, 'Erro ao atualizar cliente'));
    }
  }

  static async deletar(req, res, next) {
    try {
      const sucesso = await Cliente.delete(req.params.id);
      if (!sucesso) {
        return next(createError(404, 'Cliente não encontrado'));
      }

      cache.del('__express__/clientes');
      res.status(204).send();
    } catch (error) {
      next(createError(500, 'Erro ao deletar cliente'));
    }
  }
}

module.exports = ClienteController; 