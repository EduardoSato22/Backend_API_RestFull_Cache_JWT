const NodeCache = require('node-cache');
require('dotenv').config();

const cache = new NodeCache({
  stdTTL: parseInt(process.env.CACHE_TTL) || 30,
  checkperiod: 120
});

module.exports = cache; 