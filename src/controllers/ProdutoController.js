import { ProdutoService } from '../services/ProdutoService.js';
import createError from 'http-errors';
import { Router } from 'express';

const router = Router();

// Funções do controller
const getProdutos = async (req, res, next) => {
  try {
    const produtos = await ProdutoService.findAll();
    res.json(produtos);
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao listar produtos: ${error.message}`));
  }
};

const getProdutoById = async (req, res, next) => {
  try {
    const produto = await ProdutoService.findById(req.params.id);
    if (!produto) {
      return next(createError(404, 'Produto não encontrado'));
    }
    res.json(produto);
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao buscar produto: ${error.message}`));
  }
};

const createProduto = async (req, res, next) => {
  const { nome, descricao, preco, estoque } = req.body;
  
  if (!nome || !descricao || !preco || !estoque) {
    return next(createError(400, 'Todos os campos são obrigatórios'));
  }

  try {
    const novoProduto = await ProdutoService.create({ nome, descricao, preco, estoque });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao criar produto: ${error.message}`));
  }
};

const updateProduto = async (req, res, next) => {
  const { nome, descricao, preco, estoque } = req.body;
  
  if (!nome || !descricao || !preco || !estoque) {
    return next(createError(400, 'Todos os campos são obrigatórios'));
  }

  try {
    const produtoAtualizado = await ProdutoService.update(req.params.id, { nome, descricao, preco, estoque });
    if (!produtoAtualizado) {
      return next(createError(404, 'Produto não encontrado'));
    }
    res.json(produtoAtualizado);
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao atualizar produto: ${error.message}`));
  }
};

const deleteProduto = async (req, res, next) => {
  try {
    const sucesso = await ProdutoService.delete(req.params.id);
    if (!sucesso) {
      return next(createError(404, 'Produto não encontrado'));
    }
    res.status(204).send();
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao deletar produto: ${error.message}`));
  }
};

const patchProduto = async (req, res, next) => {
  try {
    const produtoAtualizado = await ProdutoService.patch(req.params.id, req.body);
    if (!produtoAtualizado) {
      return next(createError(404, 'Produto não encontrado'));
    }
    res.json(produtoAtualizado);
  } catch (error) {
    console.error('Erro detalhado:', error);
    next(createError(500, `Erro ao atualizar produto: ${error.message}`));
  }
};

// Rotas
router.get('/', getProdutos);
router.get('/:id', getProdutoById);
router.post('/', createProduto);
router.put('/:id', updateProduto);
router.delete('/:id', deleteProduto);
router.patch('/:id', patchProduto);

export default router; 