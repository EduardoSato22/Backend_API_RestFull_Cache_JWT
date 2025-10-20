const jwt = require('jsonwebtoken');
const databaseService = require('../configs/database-config');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verifica se o token ainda é o mesmo no banco de dados
        const user = await databaseService.findUserByUsername(decoded.usuario);
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