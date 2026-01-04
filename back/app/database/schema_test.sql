-- Schema + seed minimal for CI tests
-- This file is intended to be used ONLY in CI (GitHub Actions) or local test DB.

DROP TABLE IF EXISTS mercadorias;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE mercadorias (
  id INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  grupo VARCHAR(50) NOT NULL,
  quantidade INT NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed required by tests
INSERT INTO usuarios (id, nome, email, senha) VALUES
  (1, 'kazuza', 'kazuzabixoloko@outlook.com', 'seed-not-used');

INSERT INTO mercadorias (id, nome, grupo, quantidade, valor) VALUES
  (1, 'Fone', 'A', 10, 100.00),
  (2, 'Mouse', 'B', 8, 50.00),
  (6, 'Teclado', 'A', 5, 150.00);
