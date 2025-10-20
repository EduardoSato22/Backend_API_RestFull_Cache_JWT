# 🗄️ Opções de Banco de Dados

Você pode escolher entre **3 opções** de banco de dados para seu projeto:

## 🔥 **Opção 1: Supabase (Recomendado)**

### ✅ Vantagens
- **Gratuito** até 500MB
- **PostgreSQL** (SQL familiar)
- **APIs REST automáticas**
- **Autenticação integrada**
- **Interface web** para gerenciar dados
- **Real-time** subscriptions
- **Deploy fácil** na Vercel

### 🚀 Setup Supabase

1. **Crie conta em [supabase.com](https://supabase.com)**
2. **Crie um novo projeto**
3. **Execute o SQL**:
   ```sql
   -- Cole o conteúdo do arquivo models/supabase-schema.sql
   -- no SQL Editor do Supabase
   ```
4. **Configure as variáveis**:
   ```env
   DATABASE_TYPE=supabase
   SUPABASE_URL=https://seu-projeto.supabase.co
   SUPABASE_ANON_KEY=sua-chave-anonima
   JWT_SECRET=sua-chave-secreta
   ```

### 📊 Como usar
- Interface web em [supabase.com](https://supabase.com)
- SQL Editor integrado
- Tabelas criadas automaticamente
- APIs REST geradas automaticamente

---

## 🍃 **Opção 2: MongoDB Atlas**

### ✅ Vantagens
- **Gratuito** até 512MB
- **NoSQL** flexível
- **Escalabilidade** automática
- **Atlas Search** integrado
- **Global clusters**
- **Backup automático**

### 🚀 Setup MongoDB Atlas

1. **Crie conta em [cloud.mongodb.com](https://cloud.mongodb.com)**
2. **Crie um cluster gratuito**
3. **Configure acesso** (IP 0.0.0.0/0 para desenvolvimento)
4. **Crie usuário** com senha
5. **Configure as variáveis**:
   ```env
   DATABASE_TYPE=mongodb
   MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/
   MONGODB_DB_NAME=api_gerenciamento
   JWT_SECRET=sua-chave-secreta
   ```

### 📊 Como usar
- Interface web em [cloud.mongodb.com](https://cloud.mongodb.com)
- Compass (cliente desktop)
- Documentos JSON flexíveis
- Agregações poderosas

---

## 🐬 **Opção 3: MySQL (Original)**

### ✅ Vantagens
- **SQL tradicional**
- **Muitos provedores**
- **Conhecimento amplo**
- **ACID compliance**
- **Relacionamentos** bem definidos

### 🚀 Setup MySQL

**Opções de hosting:**
- **PlanetScale** (MySQL serverless)
- **Railway** (MySQL container)
- **Clever Cloud** (MySQL managed)
- **AWS RDS** (MySQL enterprise)

Configure as variáveis:
```env
DATABASE_TYPE=mysql
DB_HOST=seu-host-mysql.com
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=nome-do-banco
JWT_SECRET=sua-chave-secreta
```

---

## 🔧 **Como Alternar entre Bancos**

### 1. Configure a variável `DATABASE_TYPE`
```env
# Para Supabase
DATABASE_TYPE=supabase

# Para MongoDB
DATABASE_TYPE=mongodb

# Para MySQL
DATABASE_TYPE=mysql
```

### 2. Configure as variáveis específicas
- **Supabase**: `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- **MongoDB**: `MONGODB_URI`, `MONGODB_DB_NAME`
- **MySQL**: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

### 3. Instale as dependências
```bash
# Para Supabase
npm install @supabase/supabase-js

# Para MongoDB
npm install mongodb

# Para MySQL (já incluído)
# mysql2 já está instalado
```

---

## 🚀 **Deploy na Vercel**

### Variáveis de Ambiente na Vercel

#### Para Supabase:
```
DATABASE_TYPE=supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima
JWT_SECRET=sua-chave-super-secreta
NODE_ENV=production
```

#### Para MongoDB:
```
DATABASE_TYPE=mongodb
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/
MONGODB_DB_NAME=api_gerenciamento
JWT_SECRET=sua-chave-super-secreta
NODE_ENV=production
```

#### Para MySQL:
```
DATABASE_TYPE=mysql
DB_HOST=seu-host-mysql.com
DB_USER=seu-usuario
DB_PASSWORD=sua-senha-segura
DB_NAME=nome-do-banco
JWT_SECRET=sua-chave-super-secreta
NODE_ENV=production
```

---

## 💡 **Recomendações**

### 🥇 **Para Iniciantes: Supabase**
- Interface web intuitiva
- SQL familiar
- Documentação excelente
- Setup mais rápido

### 🥈 **Para Flexibilidade: MongoDB**
- Schema flexível
- Escalabilidade
- Agregações poderosas
- Ideal para dados não estruturados

### 🥉 **Para Tradicional: MySQL**
- SQL padrão
- Relacionamentos claros
- Muitos recursos online
- Conhecimento amplo

---

## 🛠️ **Próximos Passos**

1. **Escolha sua opção** de banco
2. **Configure as variáveis** de ambiente
3. **Execute os scripts** de criação
4. **Teste localmente** com `npm start`
5. **Faça deploy** na Vercel
6. **Configure as variáveis** na Vercel
7. **Teste em produção**

---

**🎯 Todas as opções funcionam perfeitamente com o sistema de cache implementado!**
