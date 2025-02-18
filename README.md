# Stock Control System

This project is an API developed with Node.js and Express, which connects to a MySQL database. The project also includes a React client that consumes the API.

## 🚀 Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Framework for creating APIs.
- **MySQL2**: Client for connecting to MySQL.
- **JWT**: Authentication via JSON Web Tokens.
- **Dotenv**: Environment variable management.

## 📂 Database Configuration

The project uses different database configurations for production and testing environments. Credentials are managed by `.env` files.

### 📌 `.env` Configuration

Create a `.env.prod` file for production and a `.env.test` file for testing inside the `app/database/` folder. Fill in the values correctly:

```ini
# Example of .env.prod file

DB_USER=
DB_PASS=
DB_PORT=
DB_HOST=
DB_NAME=

# JWT Secret
JWT_TOKEN=

# Server port
SERVER_PORT=3000
```

```ini
# Example of .env.test file

DB_USER=usertest
DB_PASS=
DB_PORT=3306
DB_HOST=127.0.0.1
DB_NAME=bd_estoque_market_test

# JWT Secret
JWT_TOKEN=
```

## 🔧 Database Connection Configuration

The database connection file (`database.js`) automatically selects the correct environment:

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

## ▶️ Available Scripts

In the `package.json`, the following scripts are available:

```json
"scripts": {
  "dev": "cross-env Node_ENV=production nodemon server.js",
  "test": "cross-env Node_ENV=test jest"
}
```

- `npm run dev`: Starts the API in production environment with `nodemon`.
- `npm run test`: Runs the tests with `Jest`.

## 📜 License

This project is licensed under the ISC license.
