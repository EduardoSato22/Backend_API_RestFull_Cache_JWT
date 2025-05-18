CREATE DATABASE IF NOT EXISTS backend_challenge;
USE backend_challenge;

CREATE TABLE IF NOT EXISTS clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  idade INT NOT NULL
);

CREATE TABLE produtos (
    id INT NOT NULL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT NOT NULL,
    data_atualizado DATETIME NOT NULL
); 

DELETE FROM clientes WHERE id = 1;

TRUNCATE TABLE clientes;
DELETE FROM clientes;
SELECT * FROM clientes;