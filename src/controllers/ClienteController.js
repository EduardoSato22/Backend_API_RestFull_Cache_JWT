import { ClienteService } from '../services/ClienteService.js';
import createError from 'http-errors';
import { Router } from 'express';
import { clearCache } from '../middlewares/cacheMiddleware.js';

const router = Router();

export const getClientes = async (req, res, next) => {
  try {
    const clientes = await ClienteService.findAll();
    res.json(clientes);
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao listar clientes: ${error.message}`));
  }
};

export const getClienteById = async (req, res, next) => {
  try {
    const cliente = await ClienteService.findById(req.params.id);
    if (!cliente) {
      return next(createError(404, 'Cliente não encontrado'));
    }
    res.json(cliente);
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
    const novoCliente = await ClienteService.create({ nome, sobrenome, email, idade });
    clearCache('/clientes');
    res.status(201).json(novoCliente);
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
    const clienteAtualizado = await ClienteService.update(req.params.id, { nome, sobrenome, email, idade });
    if (!clienteAtualizado) {
      return next(createError(404, 'Cliente não encontrado'));
    }
    clearCache('/clientes');
    res.json(clienteAtualizado);
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
    const sucesso = await ClienteService.delete(req.params.id);
    if (!sucesso) {
      return next(createError(404, 'Cliente não encontrado'));
    }
    clearCache('/clientes');
    res.status(204).send();
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao deletar cliente: ${error.message}`));
  }
};

export const patchCliente = async (req, res, next) => {
  try {
    const clienteAtualizado = await ClienteService.patch(req.params.id, req.body);
    if (!clienteAtualizado) {
      return next(createError(404, 'Cliente não encontrado'));
    }
    clearCache('/clientes');
    res.json(clienteAtualizado);
  } catch (error) {
    console.error('Erro detalhado:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      next(createError(400, 'Email já cadastrado'));
    } else {
      next(createError(500, `Erro ao atualizar cliente: ${error.message}`));
    }
  }
};

// Rotas
router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);
router.patch('/:id', patchCliente);

export default router; 