import chalk from 'chalk';

const logger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;
    
    let statusColor;
    if (status >= 500) statusColor = chalk.red;
    else if (status >= 400) statusColor = chalk.yellow;
    else if (status >= 300) statusColor = chalk.cyan;
    else if (status >= 200) statusColor = chalk.green;
    else statusColor = chalk.white;
    
    console.log(
      `${chalk.blue(method)} ${url} ${statusColor(status)} ${chalk.gray(`${duration}ms`)}`
    );
  });
  
  next();
};

export default logger; 