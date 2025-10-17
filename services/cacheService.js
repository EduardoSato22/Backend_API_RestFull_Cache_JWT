const NodeCache = require('node-cache');

// TTL de 30 segundos
const cache = new NodeCache({ stdTTL: 30 });

const get = (key) => {
    const value = cache.get(key);
    if (value) {
        console.log(`Dados servidos a partir do "Cache" para a chave: ${key}`);
        return value;
    }
    console.log(`Dados não encontrados no cache para a chave: ${key}. Buscando no "Banco de Dados".`);
    return null;
}

const set = (key, value) => {
    cache.set(key, value);
    console.log(`Cache atualizado para a chave: ${key}`);
}

const del = (key) => {
    cache.del(key);
    console.log(`Cache limpo para a chave: ${key}`);
}

const flush = () => {
    cache.flushAll();
    console.log('Cache completamente limpo.');
}

module.exports = {
    get,
    set,
    del,
    flush
}; 