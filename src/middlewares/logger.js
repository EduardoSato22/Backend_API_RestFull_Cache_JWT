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

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;

    let statusColor;
    if (status >= 500) {
      statusColor = chalk.red;
    } else if (status >= 400) {
      statusColor = chalk.yellow;
    } else if (status >= 300) {
      statusColor = chalk.cyan;
    } else if (status >= 200) {
      statusColor = chalk.green;
    } else {
      statusColor = chalk.white;
    }

    const logMessage = `${chalk.gray(new Date().toISOString())} ${chalk.blue(method)} ${url} ${statusColor(status)} ${chalk.gray(`${duration}ms`)}`;
    console.log(logMessage);
    saveLog(logMessage);
  });

  next();
}; 