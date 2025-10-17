const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /usuarios - Cria um novo usuário
router.post('/usuarios', userController.createUser);

// GET /usuarios - Lista todos os usuários (protegido)
router.get('/usuarios', authMiddleware, userController.getUsers);

// POST /login - Autentica um usuário e retorna um token
router.post('/login', userController.login);

// POST /logout - Invalida o token do usuário
router.post('/logout', userController.logout);

module.exports = router; 