import express from 'express';
import { 
  getClientes, 
  getClienteById, 
  createCliente, 
  updateCliente, 
  deleteCliente,
  patchCliente 
} from '../controllers/ClienteController.js';
import cacheMiddleware from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// Aplicando middleware de cache apenas para GET
router.get('/', cacheMiddleware(), getClientes);
router.get('/:id', cacheMiddleware(), getClienteById);

// Rotas sem cache
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.patch('/:id', patchCliente);
router.delete('/:id', deleteCliente);

// Rotas de verificação
router.head('/:id', async (req, res) => {
  res.status(200).end();
});

router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  res.status(200).end();
});

export default router; 