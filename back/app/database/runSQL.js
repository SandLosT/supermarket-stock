import fs from 'fs';
import mysql from 'mysql2'; // Esta é a importação da nova versão
import path from 'path';
import { fileURLToPath } from 'url';

// Obtém o diretório do arquivo usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criar a conexão com o banco de dados usando a nova versão do mysql2
const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '130178',
    database: 'bd_estoque_market'
});

// Função para rodar o arquivo SQL
const runSQL = () => {
    // Corrige o caminho do arquivo SQL diretamente com __dirname
    const filePath = path.join(__dirname, 'Dump20241128.sql');
    
    console.log(`Tentando abrir o arquivo: ${filePath}`); // Adicionando log para verificar o caminho

    // Lê o arquivo SQL
    fs.readFile(filePath, 'utf8', (err, sql) => {
        if (err) {
            console.error('Erro ao ler o arquivo SQL:', err);
            return;
        }

        // Executa o script SQL
        conexao.query(sql, (error, results) => {
            if (error) {
                console.error('Erro ao executar o script SQL:', error);
                return;
            }
            console.log('Script SQL executado com sucesso:', results);
            
            // Agora, a conexão será fechada após a execução do script
            conexao.end((endError) => {
                if (endError) {
                    console.error('Erro ao fechar a conexão:', endError);
                } else {
                    console.log('Conexão fechada com sucesso.');
                }
            });
        });
    });
};

// Chama a função para rodar o script SQL
runSQL();
