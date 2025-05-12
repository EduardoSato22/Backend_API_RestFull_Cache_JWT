const db = require('../configs/database');

class Produto {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM produtos');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(produto) {
    const { nome, descricao, preco } = produto;
    const [result] = await db.query(
      'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, NOW())',
      [nome, descricao, preco]
    );
    return result.insertId;
  }

  static async update(id, produto) {
    const { nome, descricao, preco } = produto;
    const [result] = await db.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = NOW() WHERE id = ?',
      [nome, descricao, preco, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Produto; 