const chalk = require('chalk');

const logger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const source = res.getHeader('X-Cache') ? '[CACHE]' : '[DB]';
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    
    const statusColor = status >= 500 ? 'red' : 
                       status >= 400 ? 'yellow' : 
                       status >= 300 ? 'cyan' : 
                       status >= 200 ? 'green' : 'white';
    
    console.log(
      `${chalk.blue(source)} ${chalk.magenta(method)} ${chalk.cyan(url)} ` +
      `${chalk[statusColor](status)} ${chalk.gray(`${duration}ms`)}`
    );
  });
  
  next();
};

module.exports = logger; 