const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { productValidationRules, validate } = require('../middlewares/validationMiddleware');

// GET /produtos - Lista todos os produtos
router.get('/produtos', productController.getAllProducts);

// GET /produtos/:id - Obtém um produto específico
router.get('/produtos/:id', productController.getProductById);

// POST /produtos - Cria um novo produto (validado)
router.post('/produtos', productValidationRules(), validate, productController.createProduct);

// PUT /produtos/:id - Atualiza um produto (validado)
router.put('/produtos/:id', productValidationRules(), validate, productController.updateProduct);

// PATCH /produtos/:id - Atualiza um produto (validado)
router.patch('/produtos/:id', productValidationRules(), validate, productController.updateProduct);

// DELETE /produtos/:id - Deleta um produto
router.delete('/produtos/:id', productController.deleteProduct);

module.exports = router; 