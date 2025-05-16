import mysql from 'mysql2/promise';
import 'dotenv/config';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'backend_challenge',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log('Configurações do banco:', {
  ...dbConfig,
  password: '******' // Não mostrar a senha no log
});

export const pool = mysql.createPool(dbConfig); 