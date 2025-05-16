import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import logger from './middlewares/logger.js';
import clientesRoutes from './routes/clientes.js';
import produtosRoutes from './routes/produtos.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API ativa' });
});

app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);

// Tratamento de erros
app.use((req, res, next) => {
  next(createError(404, 'Rota não encontrada'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Teste básico
console.log('Teste básico:');
console.log('Para iniciar o servidor, use:');
console.log('npm run dev');
console.log('Para testar a API, use o Postman ou curl:');
console.log('curl http://localhost:3000/');