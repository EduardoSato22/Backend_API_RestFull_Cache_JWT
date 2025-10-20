const NodeCache = require('node-cache');

// TTL de 30 segundos
const cache = new NodeCache({ stdTTL: 30 });
let cacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    flushes: 0,
    lastActivity: null
};

const get = (key) => {
    const value = cache.get(key);
    if (value) {
        cacheStats.hits++;
        cacheStats.lastActivity = new Date().toISOString();
        console.log(`✅ Cache HIT para a chave: ${key}`);
        return { 
            data: value, 
            fromCache: true, 
            timestamp: cacheStats.lastActivity,
            key: key
        };
    }
    cacheStats.misses++;
    cacheStats.lastActivity = new Date().toISOString();
    console.log(`❌ Cache MISS para a chave: ${key}. Buscando no banco de dados.`);
    return { 
        data: null, 
        fromCache: false, 
        timestamp: cacheStats.lastActivity,
        key: key
    };
}

const set = (key, value) => {
    cache.set(key, value);
    cacheStats.sets++;
    cacheStats.lastActivity = new Date().toISOString();
    console.log(`💾 Cache SET para a chave: ${key}`);
    return {
        success: true,
        key: key,
        timestamp: cacheStats.lastActivity
    };
}

const del = (key) => {
    const result = cache.del(key);
    cacheStats.deletes++;
    cacheStats.lastActivity = new Date().toISOString();
    console.log(`🗑️ Cache DELETE para a chave: ${key}`);
    return {
        success: result > 0,
        key: key,
        timestamp: cacheStats.lastActivity
    };
}

const flush = () => {
    cache.flushAll();
    cacheStats.flushes++;
    cacheStats.lastActivity = new Date().toISOString();
    console.log('🧹 Cache completamente limpo.');
    return {
        success: true,
        timestamp: cacheStats.lastActivity
    };
}

const getStats = () => {
    const keys = cache.keys();
    const totalRequests = cacheStats.hits + cacheStats.misses;
    const hitRate = totalRequests > 0 ? ((cacheStats.hits / totalRequests) * 100).toFixed(2) : 0;
    
    return {
        ...cacheStats,
        keys: keys,
        keyCount: keys.length,
        hitRate: `${hitRate}%`,
        totalRequests: totalRequests,
        cacheSize: cache.getStats(),
        memoryUsage: process.memoryUsage()
    };
}

const getKeys = () => {
    return cache.keys();
}

const getKeyInfo = (key) => {
    const value = cache.get(key);
    const ttl = cache.getTtl(key);
    return {
        key: key,
        exists: !!value,
        ttl: ttl ? new Date(ttl).toISOString() : null,
        dataSize: value ? JSON.stringify(value).length : 0,
        lastAccessed: cacheStats.lastActivity
    };
}

module.exports = {
    get,
    set,
    del,
    flush,
    getStats,
    getKeys,
    getKeyInfo
}; 