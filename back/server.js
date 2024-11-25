import express from 'express';  // Certifique-se de que express está importado corretamente
import cors from 'cors';        // Importando o CORS
import app from '../back/App.js' // Importando as rotas do arquivo app.js

// Criando a instância do servidor
const server = express();

// Habilitar o CORS para todas as origens (pode ser ajustado conforme necessário)
server.use(cors()); // Certifique-se de que o CORS está sendo aplicado antes das rotas

// Usando o roteador com as rotas do arquivo App.js
server.use(app); // Usa as rotas definidas no App.js

// Definir a porta que o servidor vai rodar
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
});
