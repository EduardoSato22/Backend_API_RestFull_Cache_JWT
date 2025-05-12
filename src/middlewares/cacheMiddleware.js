const cacheService = require('../services/cacheService');

const cacheMiddleware = (duration = 30) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedResponse = cacheService.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      cacheService.set(key, body);
      res.sendResponse(body);
    };

    next();
  };
};

module.exports = cacheMiddleware; 