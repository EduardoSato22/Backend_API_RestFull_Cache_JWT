# 🚀 Guia de Deploy na Vercel

## 📋 Pré-requisitos

1. **Conta na Vercel**: Crie uma conta gratuita em [vercel.com](https://vercel.com)
2. **Repositório no GitHub**: Seu código deve estar em um repositório GitHub público
3. **Banco de Dados MySQL**: Configure um banco MySQL na nuvem (PlanetScale, Railway, ou similar)

## 🛠️ Passo a Passo

### 1. Preparar o Repositório

Certifique-se de que seu repositório contém:
- ✅ `vercel.json` (configuração do deploy)
- ✅ `package.json` (com scripts corretos)
- ✅ `app.js` (arquivo principal)
- ✅ Todos os arquivos necessários

### 2. Conectar na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Importe seu repositório GitHub
4. A Vercel detectará automaticamente que é um projeto Node.js

### 3. Configurar Variáveis de Ambiente

No painel da Vercel, vá em **Settings > Environment Variables** e adicione:

```env
# Banco de Dados (substitua pelos seus valores)
DB_HOST=seu-host-mysql.com
DB_USER=seu-usuario
DB_PASSWORD=sua-senha-segura
DB_NAME=nome-do-banco
DB_SSL=true

# Autenticação
JWT_SECRET=uma-chave-super-secreta-de-pelo-menos-32-caracteres

# Ambiente
NODE_ENV=production
```

### 4. Deploy Automático

1. Após configurar as variáveis, clique em "Deploy"
2. A Vercel fará o build e deploy automaticamente
3. Aguarde alguns minutos para o processo completar

### 5. Verificar o Deploy

1. Após o deploy, você receberá uma URL (ex: `https://seu-projeto.vercel.app`)
2. Teste os endpoints:
   - `https://seu-projeto.vercel.app/` (página inicial)
   - `https://seu-projeto.vercel.app/produtos` (API de produtos)
   - `https://seu-projeto.vercel.app/cache.html` (monitor de cache)

## 🔧 Configurações Importantes

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/app.js"
    },
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### package.json (scripts importantes)
```json
{
  "scripts": {
    "start": "node app.js",
    "build": "echo 'Build completed'",
    "vercel-build": "echo 'Vercel build completed'"
  }
}
```

## 🗄️ Opções de Banco de Dados

### PlanetScale (Recomendado)
1. Crie conta em [planetscale.com](https://planetscale.com)
2. Crie um novo banco
3. Copie as credenciais de conexão
4. Configure as variáveis na Vercel

### Railway
1. Crie conta em [railway.app](https://railway.app)
2. Adicione um serviço MySQL
3. Configure as variáveis de ambiente

### Outras Opções
- **Clever Cloud**
- **Aiven**
- **AWS RDS**
- **Google Cloud SQL**

## 🐛 Troubleshooting

### Erro de Conexão com Banco
```
❌ Erro ao conectar com o banco de dados
```
**Solução:**
1. Verifique se as variáveis de ambiente estão corretas
2. Confirme se o banco permite conexões externas
3. Teste a conexão localmente primeiro

### Erro 500 no Deploy
**Possíveis causas:**
1. Variáveis de ambiente não configuradas
2. Dependências não instaladas
3. Erro no código

**Solução:**
1. Verifique os logs na Vercel
2. Teste localmente com `npm start`
3. Verifique se todas as dependências estão no `package.json`

### Cache não funcionando
**Verifique:**
1. Se o `cacheService.js` está sendo importado corretamente
2. Se as rotas de cache estão funcionando
3. Acesse `/cache/stats` para verificar

## 📊 Monitoramento

### Logs da Vercel
1. Acesse o dashboard da Vercel
2. Vá em **Functions > View Function Logs**
3. Monitore erros e performance

### Monitor de Cache
- Acesse `/cache.html` na sua aplicação
- Monitore estatísticas em tempo real
- Verifique taxa de acerto do cache

## 🔄 Deploy Contínuo

Após a configuração inicial:
1. **Push automático**: Cada push no GitHub fará deploy automático
2. **Preview deployments**: Pull requests criam previews automáticos
3. **Rollback**: Você pode fazer rollback para versões anteriores

## 💡 Dicas de Performance

1. **Cache**: O sistema de cache reduz carga no banco
2. **Connection Pool**: Configurado para 20 conexões em produção
3. **Timeout**: Configurado para 60 segundos
4. **SSL**: Habilitado para conexões seguras

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs da Vercel
2. Consulte a [documentação oficial](https://vercel.com/docs)
3. Teste localmente primeiro
4. Verifique se todas as variáveis estão configuradas

---

**🎉 Parabéns! Seu projeto está pronto para produção na Vercel!**
