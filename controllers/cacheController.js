const cacheService = require('../services/cacheService');

const getCacheStats = (req, res) => {
    try {
        const stats = cacheService.getStats();
        res.json({
            success: true,
            data: stats,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao obter estatísticas do cache',
            error: error.message
        });
    }
};

const getCacheKeys = (req, res) => {
    try {
        const keys = cacheService.getKeys();
        const keysInfo = keys.map(key => cacheService.getKeyInfo(key));
        
        res.json({
            success: true,
            data: {
                keys: keysInfo,
                count: keys.length
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao obter chaves do cache',
            error: error.message
        });
    }
};

const getKeyInfo = (req, res) => {
    try {
        const { key } = req.params;
        const keyInfo = cacheService.getKeyInfo(key);
        
        res.json({
            success: true,
            data: keyInfo,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao obter informações da chave',
            error: error.message
        });
    }
};

const deleteKey = (req, res) => {
    try {
        const { key } = req.params;
        const result = cacheService.del(key);
        
        res.json({
            success: result.success,
            message: result.success ? `Chave '${key}' removida do cache` : `Chave '${key}' não encontrada`,
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao remover chave do cache',
            error: error.message
        });
    }
};

const flushCache = (req, res) => {
    try {
        const result = cacheService.flush();
        
        res.json({
            success: result.success,
            message: 'Cache completamente limpo',
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao limpar cache',
            error: error.message
        });
    }
};

module.exports = {
    getCacheStats,
    getCacheKeys,
    getKeyInfo,
    deleteKey,
    flushCache
};
