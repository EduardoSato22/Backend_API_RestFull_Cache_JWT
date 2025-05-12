const NodeCache = require('node-cache');
const chalk = require('chalk');

const cache = new NodeCache({ stdTTL: 30 }); // 30 segundos de TTL

const cacheService = {
  get: (key) => {
    const value = cache.get(key);
    if (value) {
      console.log(chalk.green(`[CACHE] Dados recuperados do cache para a chave: ${key}`));
      return value;
    }
    console.log(chalk.yellow(`[DB] Cache miss para a chave: ${key}`));
    return null;
  },

  set: (key, value) => {
    cache.set(key, value);
    console.log(chalk.blue(`[CACHE] Dados salvos no cache para a chave: ${key}`));
  },

  del: (key) => {
    cache.del(key);
    console.log(chalk.red(`[CACHE] Cache invalidado para a chave: ${key}`));
  },

  flush: () => {
    cache.flushAll();
    console.log(chalk.red('[CACHE] Cache completamente limpo'));
  }
};

module.exports = cacheService; 