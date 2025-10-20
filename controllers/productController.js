const databaseService = require('../configs/database-config');
const cacheService = require('../services/cacheService');

const getAllProducts = async (req, res) => {
  try {
    const cacheKey = 'all_products';
    const cacheResult = cacheService.get(cacheKey);
    
    let products;
    let cacheInfo = { fromCache: false };
    
    if (cacheResult.fromCache) {
      products = cacheResult.data;
      cacheInfo = cacheResult;
    } else {
      products = await databaseService.getAllProducts();
      cacheService.set(cacheKey, products);
    }
    
    res.status(200).json({
      products,
      cache: cacheInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos.', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const cacheKey = `product_${req.params.id}`;
    const cacheResult = cacheService.get(cacheKey);
    
    let product;
    let cacheInfo = { fromCache: false };
    
    if (cacheResult.fromCache) {
      product = cacheResult.data;
      cacheInfo = cacheResult;
    } else {
      product = await databaseService.getProductById(req.params.id);
      if (product) {
        cacheService.set(cacheKey, product);
      }
    }
    
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    
    res.status(200).json({
      product,
      cache: cacheInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto.', error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await databaseService.createProduct(req.body);
    
    // Limpar cache de produtos após criar novo
    cacheService.del('all_products');
    
    res.status(201).json({
      product: newProduct,
      cache: { invalidated: ['all_products'] },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto.', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await databaseService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    
    // Limpar cache relacionado ao produto atualizado
    cacheService.del('all_products');
    cacheService.del(`product_${req.params.id}`);
    
    res.status(200).json({
      product: updatedProduct,
      cache: { invalidated: ['all_products', `product_${req.params.id}`] },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto.', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await databaseService.deleteProduct(req.params.id);
    
    // Limpar cache relacionado ao produto deletado
    cacheService.del('all_products');
    cacheService.del(`product_${req.params.id}`);
    
    res.status(200).json({
      message: 'Produto deletado com sucesso',
      cache: { invalidated: ['all_products', `product_${req.params.id}`] },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto.', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}; 