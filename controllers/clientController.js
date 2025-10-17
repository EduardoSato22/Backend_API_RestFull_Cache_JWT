const clientService = require('../services/clientService');
const cache = require('../services/cacheService');

const CACHE_KEY = 'clientes';

const getAllClients = async (req, res) => {
  try {
    const cachedClients = cache.get(CACHE_KEY);
    if (cachedClients) {
      return res.status(200).json(cachedClients);
    }

    const clients = await clientService.getAllClients();
    cache.set(CACHE_KEY, clients);
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes.', error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente.', error: error.message });
  }
};

const createClient = async (req, res) => {
  try {
    const newClient = await clientService.createClient(req.body);
    cache.del(CACHE_KEY); // Invalida o cache
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente.', error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const updatedClient = await clientService.updateClient(req.params.id, req.body);
    if (!updatedClient) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    cache.del(CACHE_KEY); // Invalida o cache
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente.', error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    await clientService.deleteClient(req.params.id);
    cache.del(CACHE_KEY); // Invalida o cache
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar cliente.', error: error.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
}; 