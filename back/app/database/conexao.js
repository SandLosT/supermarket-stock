import mysql from 'mysql2'
import dotenv from 'dotenv';


dotenv.config({ path: './app/database/.env' });
const dbPort = process.env.DB_PORT
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME

const conexao = mysql.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName
});

conexao.connect();
export default conexao;