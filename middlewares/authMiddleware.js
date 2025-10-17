const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verifica se o token ainda é o mesmo no banco de dados
        const user = await userService.findUserByToken(token);
        if (!user || user.id !== decoded.id) {
            return res.status(401).json({ message: 'Token inválido ou expirado (logout).' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = verifyToken; 