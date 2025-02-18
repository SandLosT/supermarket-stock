# API Node.js

Este projeto é uma API desenvolvida com Node.js e Express, que se conecta a um banco de dados MySQL. O projeto também inclui um cliente em React que consome a API.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação de APIs.
- **MySQL2**: Cliente para conexão com MySQL.
- **JWT**: Autenticação via JSON Web Tokens.
- **Dotenv**: Gerenciamento de variáveis de ambiente.

## 📂 Configuração do Banco de Dados

O projeto utiliza diferentes configurações de banco de dados para ambientes de produção e teste. As credenciais são gerenciadas por arquivos `.env`.

### 📌 Configuração do `.env`

Crie um arquivo `.env.prod` para produção e um `.env.test` para testes dentro da pasta `app/database/`. Preencha os valores corretamente:

```ini
# Exemplo de arquivo .env.prod

DB_USER=
DB_PASS=
DB_PORT=
DB_HOST=
DB_NAME=

# JWT Secret
JWT_TOKEN=

# Porta do servidor
SERVER_PORT=3000
```

```ini
# Exemplo de arquivo .env.test

DB_USER=usertest
DB_PASS=
DB_PORT=3306
DB_HOST=127.0.0.1
DB_NAME=bd_estoque_market_test

# JWT Secret
JWT_TOKEN=
```

## 🔧 Configuração da Conexão com o Banco de Dados

O arquivo de conexão com o banco (`database.js`) seleciona automaticamente o ambiente correto:

```javascript
import mysql from 'mysql2';
import dotenv from 'dotenv';

const fileenv = process.env.Node_ENV === 'production' 
  ? './app/database/.env.prod' 
  : './app/database/.env.test';

dotenv.config({ path: fileenv });

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

conexao.connect();

export default conexao;
```

## ▶️ Scripts Disponíveis

No `package.json`, os seguintes scripts estão disponíveis:

```json
"scripts": {
  "dev": "cross-env Node_ENV=production nodemon server.js",
  "test": "cross-env Node_ENV=test jest"
}
```

- `npm run dev`: Inicia a API em ambiente de produção com `nodemon`.
- `npm run test`: Executa os testes com `Jest`.

## 📜 Licença

Este projeto está licenciado sob a licença ISC.
