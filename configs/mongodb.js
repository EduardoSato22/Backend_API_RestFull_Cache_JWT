require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/api_gerenciamento';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(process.env.MONGODB_DB_NAME || 'api_gerenciamento');
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('📊 MongoDB configurado:', {
        database: db.databaseName,
        environment: process.env.NODE_ENV || 'development'
      });
    }
    
    console.log('✅ Conectado ao MongoDB Atlas');
    return db;
  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB:', error.message);
    if (process.env.NODE_ENV === 'production') {
      console.error('🔧 Verifique as variáveis de ambiente na Vercel');
    }
    throw error;
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
};

// Conectar automaticamente
connectDB().catch(console.error);

module.exports = { connectDB, getDB, client };
