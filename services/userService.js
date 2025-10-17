const db = require('../configs/database');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const createUser = async (usuario, senha) => {
  const hashedPassword = await bcrypt.hash(senha, saltRounds);
  const [result] = await db.execute(
    'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
    [usuario, hashedPassword]
  );
  return { id: result.insertId, usuario };
};

const getUsers = async () => {
  const [rows] = await db.execute('SELECT id, usuario FROM usuarios');
  return rows;
};

const findUserByUsername = async (usuario) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    return rows[0];
};

const saveUserToken = async (id, token) => {
    await db.execute('UPDATE usuarios SET token = ? WHERE id = ?', [token, id]);
};

const clearUserToken = async (token) => {
    await db.execute('UPDATE usuarios SET token = NULL WHERE token = ?', [token]);
};

const findUserByToken = async (token) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE token = ?', [token]);
    return rows[0];
};

module.exports = {
  createUser,
  getUsers,
  findUserByUsername,
  saveUserToken,
  clearUserToken,
  findUserByToken
}; 