import express from 'express';
import cors from 'cors';
import app from './App.js';

const server = express();

server.use(cors());
server.use(app);

// Porta pega das variáveis de ambiente
const PORT = process.env.SERVER_PORT || 3000;

// Permite acesso externo (ESSENCIAL NA EC2)
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
