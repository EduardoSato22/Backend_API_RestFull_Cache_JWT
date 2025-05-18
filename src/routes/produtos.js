import express from 'express';
import produtoRouter from '../controllers/ProdutoController.js';
import cacheMiddleware from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// Aplicando middleware de cache apenas para GET
router.use(cacheMiddleware());

// Usando as rotas do controller
router.use('/', produtoRouter);

export default router; 