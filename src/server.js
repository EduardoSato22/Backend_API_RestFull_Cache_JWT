require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const logger = require('./middlewares/logger');

const clientesRoutes = require('./routes/clientes');
const produtosRoutes = require('./routes/produtos');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 