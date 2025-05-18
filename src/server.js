import express from 'express';
import cors from 'cors';
import produtosRouter from './routes/produtos.js';
import clientesRouter from './routes/clientes.js';
import { requestLogger } from './middlewares/logger.js';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'API ativa' });
});

// Rotas
app.use('/produtos', produtosRouter);
app.use('/clientes', clientesRouter);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Erro interno do servidor',
      status: err.status || 500
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
