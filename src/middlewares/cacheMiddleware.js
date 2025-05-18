import NodeCache from 'node-cache';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para salvar log em arquivo
const saveLog = (message) => {
  const logDir = path.join(__dirname, '../../logs');
  const logFile = path.join(logDir, 'error.log');
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  // Cria o diretório de logs se não existir
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Adiciona o log ao arquivo
  fs.appendFileSync(logFile, logMessage);
};

let cache;
let cacheMiddleware;

// Funções de cache
export const getCache = (key) => {
  if (!cache) return null;
  return cache.get(key);
};

export const setCache = (key, value) => {
  if (!cache) return false;
  return cache.set(key, value);
};

try {
  // Criando uma instância do cache com TTL de 30 segundos
  cache = new NodeCache({ 
    stdTTL: 30, // Tempo de vida padrão: 30 segundos
    checkperiod: 5, // Verifica expiração a cada 5 segundos
    useClones: false
  });

  // Adiciona listener para eventos de expiração
  cache.on('expired', (key, value) => {
    const message = `[CACHE] Chave expirada automaticamente: ${key} (TTL: 30s)`;
    console.log(chalk.yellow(message));
    saveLog(message);
  });

  cacheMiddleware = () => {
    return (req, res, next) => {
      try {
        // Só aplica cache em requisições GET
        if (req.method !== 'GET') {
          return next();
        }

        // Cria uma chave única para a requisição
        const key = `__express__${req.originalUrl || req.url}`;
        
        // Tenta obter do cache
        const cachedResponse = cache.get(key);

        if (cachedResponse) {
          const ttl = cache.getTtl(key);
          const remainingTime = Math.ceil((ttl - Date.now()) / 1000);
          const message = `[CACHE] Hit: ${req.originalUrl} (expira em ${remainingTime}s)`;
          console.log(chalk.green(message));
          return res.json(cachedResponse);
        }

        const message = `[CACHE] Miss: ${req.originalUrl} (TTL: 30s)`;
        console.log(chalk.yellow(message));

        // Sobrescreve o método json para interceptar a resposta
        const originalJson = res.json;
        res.json = function(body) {
          try {
            // Salva no cache antes de enviar a resposta
            cache.set(key, body);
            const message = `[CACHE] Saved: ${req.originalUrl} (expira em 30s)`;
            console.log(chalk.blue(message));
            
            // Chama o método original
            return originalJson.call(this, body);
          } catch (error) {
            const message = `[CACHE] Erro ao salvar no cache: ${error.message}`;
            console.error(chalk.red(message));
            saveLog(message);
            return originalJson.call(this, body);
          }
        };

        next();
      } catch (error) {
        const message = `[CACHE] Erro no middleware: ${error.message}`;
        console.error(chalk.red(message));
        saveLog(message);
        next();
      }
    };
  };
} catch (error) {
  const message = `[CACHE] Erro fatal na inicialização do cache: ${error.message}`;
  console.error(chalk.red(message));
  saveLog(message);
  // Middleware que apenas passa para o próximo sem cache
  cacheMiddleware = () => (req, res, next) => next();
}

// Função para limpar o cache
export const clearCache = (pattern) => {
  if (!cache) {
    const message = '[CACHE] Cache não inicializado';
    console.error(chalk.red(message));
    saveLog(message);
    return;
  }

  try {
    if (pattern) {
      const keys = cache.keys();
      const matchingKeys = keys.filter(key => key.includes(pattern));
      cache.del(matchingKeys);
      const message = `[CACHE] Invalidado: ${matchingKeys.length} chaves com padrão "${pattern}"`;
      console.log(chalk.red(message));
    } else {
      const keys = cache.keys();
      cache.flushAll();
      const message = `[CACHE] Invalidado: ${keys.length} chaves`;
      console.log(chalk.red(message));
    }
  } catch (error) {
    const message = `[CACHE] Erro ao limpar cache: ${error.message}`;
    console.error(chalk.red(message));
    saveLog(message);
  }
};

export default cacheMiddleware; 