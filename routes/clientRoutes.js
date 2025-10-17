const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');
const { clientValidationRules, validate } = require('../middlewares/validationMiddleware');

// Aplica o middleware de autenticação a todas as rotas de /clientes
router.use('/clientes', authMiddleware);

// GET /clientes - Lista todos os clientes (protegido)
router.get('/clientes', clientController.getAllClients);

// GET /clientes/:id - Obtém um cliente específico (protegido)
router.get('/clientes/:id', clientController.getClientById);

// POST /clientes - Cria um novo cliente (protegido e validado)
router.post('/clientes', clientValidationRules(), validate, clientController.createClient);

// PUT /clientes/:id - Atualiza um cliente (protegido e validado)
router.put('/clientes/:id', clientValidationRules(), validate, clientController.updateClient);

// DELETE /clientes/:id - Deleta um cliente (protegido)
router.delete('/clientes/:id', clientController.deleteClient);

module.exports = router; 