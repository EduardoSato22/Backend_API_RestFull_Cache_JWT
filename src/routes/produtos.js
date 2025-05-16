import express from 'express';
import { getProdutos, getProdutoById, createProduto, updateProduto, deleteProduto } from '../controllers/produtoController.js';
import cacheMiddleware from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// Aplicando middleware de cache apenas para GET
router.get('/', cacheMiddleware(), getProdutos);
router.get('/:id', cacheMiddleware(), getProdutoById);

// Rotas sem cache
router.post('/', createProduto);
router.put('/:id', updateProduto);
router.delete('/:id', deleteProduto);

export default router; 