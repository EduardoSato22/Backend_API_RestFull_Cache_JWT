<<<<<<< HEAD
# Desafio Back-end II

API RESTful desenvolvida com Node.js, Express, MySQL e sistema de caching.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MySQL
- Node-Cache
- dotenv
- http-errors
- cors
- chalk

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL (versão 8.0 ou superior)

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Copie o conteúdo do arquivo `.env.example` e ajuste as variáveis conforme necessário

4. Configure o banco de dados:
- Crie um banco de dados MySQL chamado `backend_challenge`
- Execute os scripts SQL presentes na pasta `src/models` para criar as tabelas necessárias

## Executando o Projeto

Para iniciar o servidor em modo desenvolvimento:
```bash
npm run dev
```

Para iniciar o servidor em modo produção:
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## Endpoints

### Clientes

- `GET /clientes` - Lista todos os clientes
- `GET /clientes/:id` - Busca um cliente específico
- `POST /clientes` - Cria um novo cliente
- `PUT /clientes/:id` - Atualiza um cliente existente
- `DELETE /clientes/:id` - Remove um cliente

### Produtos

- `GET /produtos` - Lista todos os produtos
- `GET /produtos/:id` - Busca um produto específico
- `POST /produtos` - Cria um novo produto
- `PUT /produtos/:id` - Atualiza um produto existente
- `DELETE /produtos/:id` - Remove um produto

## Cache

- O cache está configurado para expirar após 30 segundos
- O cache é automaticamente invalidado após qualquer modificação nos dados
- Os logs indicam a origem da resposta: [CACHE] ou [DB]

## Estrutura do Projeto

```
src/
  ├── configs/         # Configurações do banco e cache
  ├── controllers/     # Controladores da aplicação
  ├── middlewares/     # Middlewares (logging, cache)
  ├── models/         # Modelos e scripts SQL
  ├── routes/         # Rotas da API
  └── server.js       # Arquivo principal
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request 
=======

>>>>>>> 414a9dec64d05e077c69897380622b715a7d35f5
