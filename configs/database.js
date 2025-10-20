require('dotenv').config();
const mysql = require('mysql2');

// Configurações do pool de conexões adaptadas para produção
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'api_gerenciamento',
  waitForConnections: true,
  connectionLimit: process.env.NODE_ENV === 'production' ? 20 : 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  // Configurações específicas para produção
  ssl: process.env.NODE_ENV === 'production' && process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false,
  // Configurações de timezone
  timezone: 'Z',
  // Configurações de charset
  charset: 'utf8mb4'
});

// Log de configuração (apenas em desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
  console.log('📊 Database configurado:', {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'api_gerenciamento',
    environment: process.env.NODE_ENV || 'development'
  });
}

// Verificar conexão
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.message);
    if (process.env.NODE_ENV === 'production') {
      console.error('🔧 Verifique as variáveis de ambiente na Vercel');
    }
  } else {
    console.log('✅ Conectado ao banco de dados MySQL');
    connection.release();
  }
});

module.exports = pool.promise(); 