import mysql from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard env var used by Node ecosystem
const NODE_ENV = process.env.NODE_ENV || 'development';

// Use test env ONLY when running tests.
// For development, we default to prod env file (local DB) unless you add a .env.dev.
const envFile =
  NODE_ENV === 'test'
    ? '.env.test'
    : NODE_ENV === 'production'
      ? '.env.prod'
      : '.env.prod';

dotenv.config({ path: path.join(__dirname, envFile) });

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Helpful log to avoid "I inserted but can't see it" issues
conexao.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL:', err.message);
    return;
  }
  console.log(`✅ MySQL conectado | ENV=${NODE_ENV} | DB=${process.env.DB_NAME} | HOST=${process.env.DB_HOST}`);
});

export default conexao;
