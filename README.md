# Sistema de Gerenciamento com Cache - API RESTful

## 📋 Descrição

Este é um sistema completo de API RESTful com sistema de cache inteligente, desenvolvido para o desafio final de Back-end II. O projeto inclui:

- **API RESTful** com autenticação JWT
- **Sistema de Cache** com monitoramento em tempo real
- **Interface Web** responsiva e profissional
- **Deploy na Vercel** configurado
- **Monitoramento de Performance** do cache

## 🚀 Funcionalidades

### Backend
- ✅ Autenticação JWT
- ✅ CRUD de Usuários, Produtos e Clientes
- ✅ Sistema de Cache com Node-Cache
- ✅ Middlewares de validação e autenticação
- ✅ API RESTful completa
- ✅ Monitoramento de cache em tempo real

### Frontend
- ✅ Interface web responsiva
- ✅ Sistema de login/logout
- ✅ Listagem de produtos com cache
- ✅ Monitor de cache em tempo real
- ✅ Indicadores visuais de performance
- ✅ Auto-refresh das estatísticas

### Cache System
- ✅ Cache automático com TTL de 30 segundos
- ✅ Estatísticas detalhadas (hits, misses, taxa de acerto)
- ✅ Interface de monitoramento
- ✅ Invalidação automática em operações CRUD
- ✅ Visualização de chaves e informações

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Banco de Dados**: Supabase (PostgreSQL)
- **Cache**: Node-Cache
- **Autenticação**: JWT
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Deploy**: Vercel
- **Testes**: Jest

## 📦 Instalação Local

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Conta no Supabase
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd Trabalho_Final_BackEnd_2
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados Supabase**
```sql
-- Execute o arquivo models/supabase-schema.sql no seu projeto Supabase
-- Ou configure suas próprias tabelas conforme necessário
```

4. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo para Supabase
cp env.supabase .env

# Edite o arquivo .env com suas configurações do Supabase
```

5. **Teste a conexão com Supabase**
```bash
npm run test-supabase
```

6. **Execute o projeto**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🌐 Deploy na Vercel

### Configuração Automática

1. **Conecte seu repositório na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Importe seu repositório GitHub

2. **Configure as variáveis de ambiente**
   No painel da Vercel, adicione as seguintes variáveis:
   ```
   SUPABASE_URL=https://seu-projeto.supabase.co
   SUPABASE_ANON_KEY=sua-chave-anonima
   SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
   JWT_SECRET=sua-chave-jwt-super-segura
   NODE_ENV=production
   DATABASE_TYPE=supabase
   ```

3. **Deploy automático**
   - A Vercel detectará automaticamente as configurações do `vercel.json`
   - O deploy será feito automaticamente a cada push

### Configuração Manual (se necessário)

1. **Instale a Vercel CLI**
```bash
npm i -g vercel
```

2. **Configure o projeto**
```bash
vercel login
vercel link
```

3. **Deploy**
```bash
vercel --prod
```

## 📊 Monitoramento de Cache

### Acessando o Monitor
- Acesse `/cache.html` na sua aplicação
- Visualize estatísticas em tempo real
- Monitore chaves do cache
- Gerencie o cache (limpar, deletar chaves específicas)

### Estatísticas Disponíveis
- **Taxa de Acerto**: Percentual de cache hits
- **Cache Hits/Misses**: Contadores absolutos
- **Chaves no Cache**: Quantidade e detalhes
- **Uso de Memória**: Monitoramento de recursos
- **Total de Requisições**: Contador geral

## 🔧 API Endpoints

### Autenticação
- `POST /login` - Login de usuário
- `POST /logout` - Logout (requer token)

### Produtos (Público)
- `GET /produtos` - Listar todos os produtos
- `GET /produtos/:id` - Buscar produto por ID

### Usuários (Protegido)
- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar usuário
- `PUT /usuarios/:id` - Atualizar usuário
- `DELETE /usuarios/:id` - Deletar usuário

### Clientes (Protegido)
- `GET /clientes` - Listar clientes
- `POST /clientes` - Criar cliente
- `PUT /clientes/:id` - Atualizar cliente
- `DELETE /clientes/:id` - Deletar cliente

### Cache Management
- `GET /cache/stats` - Estatísticas do cache
- `GET /cache/keys` - Listar chaves do cache
- `GET /cache/keys/:key` - Informações de uma chave
- `DELETE /cache/keys/:key` - Deletar chave específica
- `DELETE /cache/flush` - Limpar todo o cache

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes específicos
npm test -- --testNamePattern="auth"
```

## 📁 Estrutura do Projeto

```
Trabalho_Final_BackEnd_2/
├── app.js                 # Aplicação principal
├── server.js              # Servidor (desenvolvimento)
├── vercel.json            # Configuração Vercel
├── package.json           # Dependências
├── env.example            # Exemplo de variáveis
├── README.md              # Este arquivo
├── configs/
│   └── database.js        # Configuração do banco
├── controllers/
│   ├── cacheController.js # Controller do cache
│   ├── clientController.js
│   ├── productController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js  # Autenticação JWT
│   └── validationMiddleware.js
├── models/
│   └── schema.sql         # Schema do banco
├── routes/
│   ├── cacheRoutes.js     # Rotas do cache
│   ├── clientRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── services/
│   ├── cacheService.js    # Serviço de cache
│   ├── clientService.js
│   ├── productService.js
│   └── userService.js
├── tests/
│   ├── auth.test.js
│   ├── users.test.js
│   └── validation.test.js
└── public/
    ├── index.html
    ├── login.html
    ├── produtos.html
    ├── cache.html         # Monitor de cache
    ├── dados.html
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Validação de entrada
- ✅ Sanitização de dados
- ✅ Middleware de autenticação
- ✅ Variáveis de ambiente para credenciais

## 🚀 Performance

- ✅ Sistema de cache com TTL configurável
- ✅ Invalidação inteligente de cache
- ✅ Monitoramento de performance
- ✅ Otimização de queries
- ✅ Deploy otimizado na Vercel

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se todas as variáveis de ambiente estão configuradas
2. Confirme se o banco de dados está acessível
3. Verifique os logs da aplicação
4. Consulte a documentação da Vercel se necessário

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte do desafio final de Back-end II.

---

**Desenvolvido com ❤️ para demonstrar conhecimento em Node.js, Express, Cache e Deploy**