const express = require('express');
const router = express.Router();
const cacheController = require('../controllers/cacheController');

// Rotas para monitoramento do cache
router.get('/cache/stats', cacheController.getCacheStats);
router.get('/cache/keys', cacheController.getCacheKeys);
router.get('/cache/keys/:key', cacheController.getKeyInfo);
router.delete('/cache/keys/:key', cacheController.deleteKey);
router.delete('/cache/flush', cacheController.flushCache);

module.exports = router;
