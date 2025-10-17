const db = require('../configs/database');

const getAllClients = async () => {
  const [rows] = await db.execute('SELECT * FROM clientes');
  return rows;
};

const getClientById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
};

const createClient = async (cliente) => {
  const { nome, sobrenome, email, idade } = cliente;
  const [result] = await db.execute(
    'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
    [nome, sobrenome, email, idade]
  );
  return { id: result.insertId, ...cliente };
};

const updateClient = async (id, cliente) => {
  const { nome, sobrenome, email, idade } = cliente;
  await db.execute(
    'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
    [nome, sobrenome, email, idade, id]
  );
  return { id, ...cliente };
};

const deleteClient = async (id) => {
  await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
  return { id };
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
}; 