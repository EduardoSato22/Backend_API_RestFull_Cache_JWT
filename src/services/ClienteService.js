import { pool } from '../configs/database.js';
import { getCache, setCache } from '../middlewares/cacheMiddleware.js';

export class ClienteService {
  static async findAll() {
    const cacheKey = '/clientes';
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    const [rows] = await pool.query('SELECT * FROM clientes');
    await setCache(cacheKey, rows);
    return rows;
  }

  static async findById(id) {
    const cacheKey = `/clientes/${id}`;
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (rows.length > 0) {
      await setCache(cacheKey, rows[0]);
      return rows[0];
    }
    return null;
  }

  static async create(clienteData) {
    const { nome, sobrenome, email, idade } = clienteData;
    const [result] = await pool.query(
      'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
      [nome, sobrenome, email, idade]
    );
    return { id: result.insertId, ...clienteData };
  }

  static async update(id, clienteData) {
    const { nome, sobrenome, email, idade } = clienteData;
    const [result] = await pool.query(
      'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
      [nome, sobrenome, email, idade, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async patch(id, clienteData) {
    const [current] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (current.length === 0) {
      return null;
    }

    const updatedData = {
      nome: clienteData.nome || current[0].nome,
      sobrenome: clienteData.sobrenome || current[0].sobrenome,
      email: clienteData.email || current[0].email,
      idade: clienteData.idade || current[0].idade
    };

    const [result] = await pool.query(
      'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
      [updatedData.nome, updatedData.sobrenome, updatedData.email, updatedData.idade, id]
    );

    return result.affectedRows > 0 ? { id, ...updatedData } : null;
  }
} 