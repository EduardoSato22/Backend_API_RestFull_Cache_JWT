# API - Desafio Final Back-end II

Esta é uma API RESTful para gerenciar clientes, produtos e usuários, desenvolvida em Node.js e Express.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-diretorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto. Você pode copiar o exemplo abaixo.

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=desafio_final
   PORT=3000
   JWT_SECRET=seu_segredo_super_secreto
   ```

2. Certifique-se de que você tem um servidor MySQL rodando e crie um banco de dados com o nome especificado em `DB_NAME`.

3. Execute o script `models/schema.sql` no seu banco de dados para criar as tabelas necessárias.

## Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento:
```bash
npm start
```

## Executando os Testes

Para rodar os testes automatizados:
```bash
npm test
``` 