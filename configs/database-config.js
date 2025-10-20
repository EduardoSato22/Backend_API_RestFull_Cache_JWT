require('dotenv').config();

const DATABASE_TYPE = process.env.DATABASE_TYPE || 'mysql'; // mysql, supabase, mongodb

let databaseService;

switch (DATABASE_TYPE) {
  case 'supabase':
    console.log('🔧 Usando Supabase (PostgreSQL)');
    databaseService = require('../services/supabaseService');
    break;
  
  case 'mongodb':
    console.log('🔧 Usando MongoDB Atlas');
    databaseService = require('../services/mongodbService');
    break;
  
  case 'mysql':
  default:
    console.log('🔧 Usando MySQL');
    // Carregar serviços do MySQL apenas quando necessário
    const userService = require('../services/userService');
    const productService = require('../services/productService');
    const clientService = require('../services/clientService');
    
    databaseService = {
      // Usuários
      getAllUsers: userService.getUsers,
      getUserById: userService.getUserById,
      createUser: userService.createUser,
      updateUser: userService.updateUser,
      deleteUser: userService.deleteUser,
      findUserByUsername: userService.findUserByUsername,
      
      // Produtos
      getAllProducts: productService.getProducts,
      getProductById: productService.getProductById,
      createProduct: productService.createProduct,
      updateProduct: productService.updateProduct,
      deleteProduct: productService.deleteProduct,
      
      // Clientes
      getAllClients: clientService.getClients,
      getClientById: clientService.getClientById,
      createClient: clientService.createClient,
      updateClient: clientService.updateClient,
      deleteClient: clientService.deleteClient
    };
    break;
}

module.exports = databaseService;
