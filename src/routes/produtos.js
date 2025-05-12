const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const cacheMiddleware = require('../middlewares/cache');

router.get('/', cacheMiddleware(30), ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);
router.post('/', ProdutoController.criar);
router.put('/:id', ProdutoController.atualizar);
router.delete('/:id', ProdutoController.deletar);

module.exports = router; 