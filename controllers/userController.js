const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) {
      return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }
    const newUser = await userService.createUser(usuario, senha);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários.', error: error.message });
  }
};

const login = async (req, res) => {
    try {
        const { usuario, senha } = req.body;
        const user = await userService.findUserByUsername(usuario);

        if (!user || !(await bcrypt.compare(senha, user.senha))) {
            return res.status(401).json({ message: 'Usuário ou senha inválida.' });
        }

        const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        await userService.saveUserToken(user.id, token);

        res.status(200).json({ auth: true, token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no login.', error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'Token não fornecido.' });
        }
        await userService.clearUserToken(token);
        res.status(200).json({ message: 'Logout bem-sucedido.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no logout.', error: error.message });
    }
};

module.exports = {
  createUser,
  getUsers,
  login,
  logout
}; 