# 🔧 Instalação das Dependências para Scripts de Seed

## 📦 Instalar Dependências do Projeto

Antes de executar os scripts de seed, você precisa instalar as novas dependências:

```powershell
cd backend/resources
npm install
```

Isso instalará:
- `mongodb@^6.3.0` - Driver MongoDB nativo para Node.js
- `cross-env@^7.0.3` - Para variáveis de ambiente multiplataforma

## ✅ Verificar Instalação

Verifique se as dependências foram instaladas corretamente:

```powershell
# Verificar se mongodb está instalado
npm list mongodb

# Verificar se cross-env está instalado
npm list cross-env
```

Você deve ver algo como:
```
resources-api@1.0.0
├── mongodb@6.3.0
└── cross-env@7.0.3
```

## 🚀 Testar Seed Após Instalação

Após instalar as dependências, teste o seed:

```powershell
# Popular o banco
npm run seed:mongo
```

Se tudo estiver correto, você verá:
```
🔌 Conectando ao MongoDB...
✅ Conectado ao MongoDB
🌱 Iniciando seed do banco MongoDB...
📁 Criando categorias...
✅ 3 categorias criadas
🔧 Criando features...
✅ 9 features criadas
📦 Criando resources...
✅ 10 resources criados
💎 30 feature values criados

🎉 Seed concluído com sucesso!

📊 Resumo:
   Categorias: 3
   Features: 9
   Resources: 10
   Feature Values: 30
```

## 🐛 Troubleshooting

### Erro: "Cannot find module 'mongodb'"
**Solução**: Instalar dependências
```powershell
npm install
```

### Erro: "cross-env: command not found"
**Solução**: Instalar cross-env globalmente (opcional)
```powershell
npm install -g cross-env
```
Ou apenas use `npm install` no projeto.

### Erro: "Connection refused"
**Problema**: MongoDB não está rodando  
**Solução**: Iniciar MongoDB
```powershell
docker-compose up -d mongodb
```

### Erro ao instalar dependências
**Problema**: Cache corrompido  
**Solução**: Limpar cache do npm
```powershell
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

## 📋 Checklist de Instalação

- [ ] Node.js instalado (>= 18)
- [ ] npm instalado
- [ ] Dependências do projeto instaladas (`npm install`)
- [ ] MongoDB rodando (via Docker ou local)
- [ ] Variáveis de ambiente configuradas (`.env`)
- [ ] Seed testado com sucesso (`npm run seed:mongo`)

## 🎯 Próximo Passo

Após instalar as dependências, consulte:
- **[SEED_QUICKSTART.md](SEED_QUICKSTART.md)** - Como usar o seed
- **[SEED_DOCS_INDEX.md](SEED_DOCS_INDEX.md)** - Toda a documentação

---

**Dica**: Se você já tinha o projeto instalado, basta rodar `npm install` para adicionar as novas dependências.
