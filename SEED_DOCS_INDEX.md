# 📚 Documentação dos Scripts de Seed MongoDB

## 🎯 Início Rápido

### Para Docker/Produção (Recomendado)
Configure o auto-seed no arquivo `.env`:
```env
AUTO_SEED=true
```
O banco será populado automaticamente quando a aplicação subir (se estiver vazio).

📖 **Leia**: [AUTO_SEED.md](AUTO_SEED.md) - Documentação completa do auto-seed

### Para Desenvolvimento Local
Se você quer apenas popular o banco manualmente:
- **[SEED_QUICKSTART.md](SEED_QUICKSTART.md)** - Guia rápido em 3 passos

## 📖 Documentação Completa

### Auto-Seed (Novo! 🎉)
1. **[AUTO_SEED.md](AUTO_SEED.md)** - Seed automático na inicialização da aplicação

### Seed Manual
2. **[SEED_SCRIPTS_SUMMARY.md](SEED_SCRIPTS_SUMMARY.md)** - Visão geral completa de todos os scripts
3. **[src/scripts/README.md](src/scripts/README.md)** - Documentação detalhada dos scripts
4. **[MONGODB_MIGRATION.md](MONGODB_MIGRATION.md)** - Informações sobre a migração para MongoDB

### Arquivos de Script

#### Dados
- `src/scripts/seed-data.json` - Dados estruturados em JSON

#### Scripts de Seed
- `src/scripts/seed.ts` - Seed usando NestJS services (original)
- `src/scripts/seed-mongodb.ts` - Seed direto usando MongoDB driver
- `src/scripts/seed-mongo.js` - Seed para MongoDB Shell (mongosh)

#### Scripts PowerShell
- `src/scripts/seed-mongo.ps1` - Wrapper para executar via mongosh
- `src/scripts/seed-mongodb.ps1` - Wrapper para executar via Node.js
- `src/scripts/verify-seed.ps1` - Verificar dados após seed

## 🚀 Como Usar

### Opção 1: Via NPM (Mais Simples)
```powershell
npm run seed:mongo        # Popular o banco
npm run seed:mongo:clean  # Popular limpando dados existentes
```

### Opção 2: Via PowerShell
```powershell
# Do diretório backend/resources/src/scripts
.\seed-mongodb.ps1
.\seed-mongodb.ps1 -Clean
```

### Opção 3: Diretamente
```powershell
# Com mongosh
mongosh "mongodb://resources:a12345678@localhost:27017/resources?authSource=resources" < src/scripts/seed-mongo.js

# Com Node.js
npx ts-node -r tsconfig-paths/register src/scripts/seed-mongodb.ts
```

## ✅ Verificação

Após executar o seed, verifique os dados:

```powershell
# Via script PowerShell
.\src\scripts\verify-seed.ps1

# Via API
Invoke-RestMethod -Uri "http://localhost:8187/api/v1/categories"
```

## 📊 Dados Criados

O seed popula o banco com:
- **3 Categorias** (Audiovisuais, Informática, Laboratório)
- **9 Features** (propriedades dos equipamentos)
- **10 Resources** (equipamentos) com quantidades
- **30 Feature Values** (valores das propriedades)

## 🎓 Tutoriais

### Para Desenvolvimento Local
1. Instalar dependências: `npm install`
2. Popular banco: `npm run seed:mongo`
3. Verificar: `npm run start:dev`

### Para Docker
1. Subir containers: `docker-compose up -d mongodb resources`
2. Popular banco: `docker-compose exec resources npm run seed:mongo`
3. Verificar: `docker-compose exec resources npm run verify`

### Para Testes
1. Limpar e popular: `npm run seed:mongo:clean`
2. Executar testes: `npm test`

## 🔍 Estrutura dos Dados

```
Categories
├── Equipamentos Audiovisuais
│   ├── Features: Resolução, Conectividade, Portátil
│   └── Resources: Projetor, Microfone, Caixa de Som, Câmera
│
├── Equipamentos de Informática
│   ├── Features: Processador, Memória RAM, Armazenamento
│   └── Resources: Notebook, Tablet, Adaptador
│
└── Equipamentos de Laboratório
    ├── Features: Capacidade, Voltagem, Calibrado
    └── Resources: Osciloscópio, Multímetro, Fonte
```

## 🚨 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Connection refused | `docker-compose up -d mongodb` |
| Authentication failed | Verificar `.env` e credenciais |
| Dados duplicados | Usar `npm run seed:mongo:clean` |
| mongosh não encontrado | Instalar MongoDB Shell |

## 📱 Links Úteis

- [MongoDB Shell Download](https://www.mongodb.com/try/download/shell)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [NestJS Mongoose](https://docs.nestjs.com/techniques/mongodb)
- [Docker Compose](https://docs.docker.com/compose/)

## 🛠️ Manutenção

Para adicionar novos dados, edite:
- `src/scripts/seed-data.json` - Arquivo de dados estruturado

Então execute:
```powershell
npm run seed:mongo:clean
```

## 📞 Ajuda

Se precisar de ajuda:
1. Leia o guia rápido: [SEED_QUICKSTART.md](SEED_QUICKSTART.md)
2. Consulte a documentação completa: [SEED_SCRIPTS_SUMMARY.md](SEED_SCRIPTS_SUMMARY.md)
3. Veja os detalhes dos scripts: [src/scripts/README.md](src/scripts/README.md)
4. Verifique os logs: `docker-compose logs resources mongodb`

---

**💡 Dica**: Para a maioria dos casos, use `npm run seed:mongo` ou `npm run seed:mongo:clean`
