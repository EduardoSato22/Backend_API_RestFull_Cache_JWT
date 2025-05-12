const db = require('../configs/database');

class Cliente {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(cliente) {
    const { nome, sobrenome, email, idade } = cliente;
    const [result] = await db.query(
      'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
      [nome, sobrenome, email, idade]
    );
    return result.insertId;
  }

  static async update(id, cliente) {
    const { nome, sobrenome, email, idade } = cliente;
    const [result] = await db.query(
      'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
      [nome, sobrenome, email, idade, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Cliente; 