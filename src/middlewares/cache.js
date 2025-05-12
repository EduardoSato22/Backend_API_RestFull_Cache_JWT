const cache = require('../configs/cache');

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cachedResponse);
    }

    res.setHeader('X-Cache', 'MISS');
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.sendResponse(body);
    };
    next();
  };
};

module.exports = cacheMiddleware; 