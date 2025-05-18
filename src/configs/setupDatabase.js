import { pool } from './database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  try {
    const sqlPath = path.join(__dirname, 'database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Executa cada comando SQL separadamente
    const commands = sql.split(';').filter(cmd => cmd.trim());
    
    for (const command of commands) {
      if (command.trim()) {
        await pool.query(command);
        console.log('Comando SQL executado com sucesso:', command.trim().substring(0, 50) + '...');
      }
    }
    
    console.log('Banco de dados configurado com sucesso!');
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error);
  } finally {
    await pool.end();
  }
}

setupDatabase(); 