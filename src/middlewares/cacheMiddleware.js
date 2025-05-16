import NodeCache from 'node-cache';
import chalk from 'chalk';

let cache;
let cacheMiddleware;

try {
  // Criando uma instância do cache com TTL de 30 segundos
  cache = new NodeCache({ 
    stdTTL: 30,
    checkperiod: 10,
    useClones: false
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
          console.log(chalk.green(`[CACHE] Dados recuperados do cache para: ${req.originalUrl}`));
          return res.json(cachedResponse);
        }

        console.log(chalk.yellow(`[DB] Cache miss para: ${req.originalUrl}`));

        // Sobrescreve o método json para interceptar a resposta
        const originalJson = res.json;
        res.json = function(body) {
          try {
            // Salva no cache antes de enviar a resposta
            cache.set(key, body);
            console.log(chalk.blue(`[CACHE] Dados salvos no cache para: ${req.originalUrl}`));
            
            // Chama o método original
            return originalJson.call(this, body);
          } catch (error) {
            console.error(chalk.red(`[CACHE] Erro ao salvar no cache: ${error.message}`));
            return originalJson.call(this, body);
          }
        };

        next();
      } catch (error) {
        console.error(chalk.red(`[CACHE] Erro no middleware: ${error.message}`));
        next();
      }
    };
  };
} catch (error) {
  console.error(chalk.red(`[CACHE] Erro fatal na inicialização do cache: ${error.message}`));
  // Middleware que apenas passa para o próximo sem cache
  cacheMiddleware = () => (req, res, next) => next();
}

// Função para limpar o cache
export const clearCache = (pattern) => {
  if (!cache) {
    console.error(chalk.red('[CACHE] Cache não inicializado'));
    return;
  }

  try {
    if (pattern) {
      const keys = cache.keys();
      const matchingKeys = keys.filter(key => key.includes(pattern));
      cache.del(matchingKeys);
      console.log(chalk.red(`[CACHE] Cache limpo para o padrão: ${pattern}`));
    } else {
      cache.flushAll();
      console.log(chalk.red('[CACHE] Cache completamente limpo'));
    }
  } catch (error) {
    console.error(chalk.red(`[CACHE] Erro ao limpar cache: ${error.message}`));
  }
};

export default cacheMiddleware; 