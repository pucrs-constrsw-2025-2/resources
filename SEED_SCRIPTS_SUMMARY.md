# Scripts de Seed MongoDB - Documentação Completa

## 📋 Resumo

Este documento descreve todos os scripts criados para popular o banco de dados MongoDB da API de Resources.

## 🎯 Objetivo

Facilitar a população do banco MongoDB com dados iniciais de categorias, features, resources e feature values, oferecendo múltiplas formas de execução para diferentes cenários de uso.

## 📁 Estrutura de Arquivos Criados

```
backend/resources/
├── src/
│   └── scripts/
│       ├── seed-data.json          # Dados estruturados em JSON
│       ├── seed.ts                 # Seed original (NestJS)
│       ├── seed-mongodb.ts         # Seed direto (MongoDB driver)
│       ├── seed-mongo.js           # Seed para MongoDB Shell
│       ├── seed-mongo.ps1          # Wrapper PowerShell (mongosh)
│       ├── seed-mongodb.ps1        # Wrapper PowerShell (Node.js)
│       ├── verify-seed.ps1         # Script de verificação
│       └── README.md               # Documentação completa dos scripts
├── package.json                    # Atualizado com novos scripts npm
├── SEED_QUICKSTART.md             # Guia rápido de início
└── MONGODB_MIGRATION.md           # Documentação da migração (já existia)
```

## 🚀 Formas de Execução

### 1. Via NPM (Recomendado)

```powershell
# Seed usando driver MongoDB nativo
npm run seed:mongo

# Seed com limpeza prévia do banco
npm run seed:mongo:clean

# Seed usando NestJS services (original)
npm run seed
```

### 2. Via PowerShell Scripts

```powershell
# Usando MongoDB Shell (mongosh)
.\src\scripts\seed-mongo.ps1
.\src\scripts\seed-mongo.ps1 -Clean
.\src\scripts\seed-mongo.ps1 -MongoUri "mongodb://..."

# Usando Node.js/TypeScript
.\src\scripts\seed-mongodb.ps1
.\src\scripts\seed-mongodb.ps1 -Clean
.\src\scripts\seed-mongodb.ps1 -MongoUri "mongodb://..."

# Verificar dados após seed
.\src\scripts\verify-seed.ps1
```

### 3. Diretamente com Ferramentas

```powershell
# Com mongosh
mongosh "mongodb://resources:a12345678@localhost:27017/resources?authSource=resources" < src/scripts/seed-mongo.js

# Com ts-node
npx ts-node -r tsconfig-paths/register src/scripts/seed-mongodb.ts
```

## 📊 Dados Populados

### Categorias (3)
1. Equipamentos Audiovisuais
2. Equipamentos de Informática
3. Equipamentos de Laboratório

### Features (9)
- **Audiovisuais**: Resolução, Conectividade, Portátil
- **Informática**: Processador, Memória RAM, Armazenamento
- **Laboratório**: Capacidade, Voltagem, Calibrado

### Resources (10)
- **Audiovisuais**: Projetor (12), Microfone (8), Caixa de Som (6), Câmera 4K (4)
- **Informática**: Notebook (20), Tablet (15), Adaptador (25)
- **Laboratório**: Osciloscópio (5), Multímetro (10), Fonte (8)

### Feature Values (30)
Cada resource possui valores para todas as features da sua categoria.

## 🔧 Dependências Adicionadas

No `package.json`:

```json
{
  "dependencies": {
    "cross-env": "^7.0.3",
    "mongodb": "^6.3.0"
  },
  "scripts": {
    "seed:mongo": "ts-node -r tsconfig-paths/register src/scripts/seed-mongodb.ts",
    "seed:mongo:clean": "cross-env CLEAN_DB=true ts-node -r tsconfig-paths/register src/scripts/seed-mongodb.ts"
  }
}
```

## 🔑 Variáveis de Ambiente

### Para seed-mongodb.ts
```env
MONGO_URI=mongodb://resources:a12345678@localhost:27017/resources?authSource=resources
CLEAN_DB=false  # true para limpar antes de popular
```

### Para seed.ts (NestJS)
```env
MONGODB_INTERNAL_HOST=localhost
MONGODB_INTERNAL_PORT=27017
RESOURCES_MONGODB_USER=resources
RESOURCES_MONGODB_PASSWORD=a12345678
RESOURCES_MONGODB_DB=resources
```

## 📝 Características dos Scripts

### seed-data.json
- ✅ Dados estruturados e legíveis
- ✅ Fácil de manter e expandir
- ✅ Usado pelos scripts Node.js
- ✅ Formato independente de implementação

### seed.ts (NestJS Services)
- ✅ Usa services e DTOs do NestJS
- ✅ Validações da aplicação
- ✅ Compatível com SQLite e MongoDB
- ⚠️ Requer configuração do NestJS
- ⚠️ Mais lento

### seed-mongodb.ts (MongoDB Driver)
- ✅ Conexão direta ao MongoDB
- ✅ Mais rápido
- ✅ Leitura de seed-data.json
- ✅ Suporta limpeza prévia (CLEAN_DB)
- ⚠️ Não valida com NestJS
- ⚠️ Apenas MongoDB

### seed-mongo.js (MongoDB Shell)
- ✅ Executa no mongosh
- ✅ Muito rápido
- ✅ Não requer Node.js
- ✅ Ideal para automação
- ⚠️ Não valida com NestJS
- ⚠️ Apenas MongoDB

### seed-mongo.ps1 (PowerShell Wrapper)
- ✅ Interface amigável
- ✅ Validação de pré-requisitos
- ✅ Parâmetros configuráveis
- ✅ Mensagens coloridas
- 🎯 Chama seed-mongo.js via mongosh

### seed-mongodb.ps1 (PowerShell Wrapper)
- ✅ Interface amigável
- ✅ Validação de pré-requisitos
- ✅ Parâmetros configuráveis
- ✅ Mensagens coloridas
- 🎯 Chama seed-mongodb.ts via ts-node

### verify-seed.ps1
- ✅ Verifica dados no banco
- ✅ Exibe resumo detalhado
- ✅ Identifica problemas
- ✅ Mensagens coloridas

## 🐳 Integração com Docker

### Executar Seed Após Docker Compose

```powershell
# Subir containers
docker-compose up -d mongodb resources

# Aguardar inicialização
Start-Sleep -Seconds 5

# Executar seed (do host)
cd backend/resources
npm run seed:mongo

# Ou dentro do container
docker-compose exec resources npm run seed:mongo
```

### Seed Automático no Startup

Para executar o seed automaticamente ao subir o container, modifique o `Dockerfile`:

```dockerfile
CMD ["sh", "-c", "npm run seed:mongo && npm run start:prod"]
```

Ou no `docker-compose.yml`:

```yaml
services:
  resources:
    command: sh -c "npm run seed:mongo && npm run start:prod"
```

## ✅ Testes e Verificação

### Verificar com Script PowerShell
```powershell
.\src\scripts\verify-seed.ps1
```

### Verificar com mongosh
```javascript
use resources
db.categories.countDocuments()      // 3
db.features.countDocuments()        // 9
db.resources.countDocuments()       // 10
db.feature_values.countDocuments()  // 30
```

### Verificar via API
```powershell
Invoke-RestMethod -Uri "http://localhost:8187/api/v1/categories"
Invoke-RestMethod -Uri "http://localhost:8187/api/v1/resources"
Invoke-RestMethod -Uri "http://localhost:8187/api/v1/features"
```

## 🚨 Troubleshooting

### Connection Refused
```powershell
# Verificar se MongoDB está rodando
docker-compose ps mongodb

# Iniciar MongoDB se necessário
docker-compose up -d mongodb

# Verificar logs
docker-compose logs mongodb
```

### Authentication Failed
- Verifique credenciais no `.env`
- Confirme `authSource` no URI
- Verifique se usuário existe no MongoDB

### Dados Duplicados
```powershell
# Usar modo de limpeza
npm run seed:mongo:clean

# Ou via PowerShell
.\src\scripts\seed-mongodb.ps1 -Clean
```

### mongosh não encontrado
- Instalar MongoDB Shell: https://www.mongodb.com/try/download/shell
- Adicionar ao PATH do sistema

## 🎓 Exemplos de Uso

### Desenvolvimento Local
```powershell
# Primeira vez
cd backend/resources
npm install
npm run seed:mongo

# Repopular banco limpo
npm run seed:mongo:clean
```

### Ambiente Docker
```powershell
# Subir ambiente
docker-compose up -d

# Popular banco
docker-compose exec resources npm run seed:mongo

# Verificar
docker-compose exec resources npm run verify-seed
```

### CI/CD Pipeline
```yaml
# GitHub Actions / Azure DevOps
- name: Seed Database
  run: |
    cd backend/resources
    npm install
    npm run seed:mongo:clean
```

### Testes Automatizados
```powershell
# Antes dos testes
npm run seed:mongo:clean

# Executar testes
npm test

# Limpar após testes
npm run seed:mongo:clean
```

## 📚 Documentação Adicional

- **SEED_QUICKSTART.md** - Guia de início rápido
- **src/scripts/README.md** - Documentação detalhada dos scripts
- **MONGODB_MIGRATION.md** - Informações sobre migração para MongoDB
- **README.md** - Documentação geral da API

## 🔄 Próximos Passos / Melhorias Futuras

1. **Seed Idempotente**: Modificar scripts para usar upsert e evitar duplicatas
2. **Seed Incremental**: Permitir adicionar dados sem remover existentes
3. **Seed por Categoria**: Popular apenas categorias específicas
4. **Validação de Dados**: Adicionar validação antes de inserir
5. **Backup/Restore**: Scripts para backup e restore dos dados
6. **Fixtures de Teste**: Diferentes conjuntos de dados para testes
7. **Seed UI**: Interface web para gerenciar seed

## 👥 Manutenção

Para adicionar novos dados:

1. Editar `src/scripts/seed-data.json`
2. Adicionar categorias, features ou resources
3. Executar seed: `npm run seed:mongo:clean`
4. Verificar: `.\src\scripts\verify-seed.ps1`

## 📞 Suporte

Em caso de problemas:
1. Verificar logs: `docker-compose logs resources mongodb`
2. Verificar configuração: `.env` e `docker-compose.yml`
3. Verificar conectividade: `mongosh $MONGO_URI`
4. Consultar documentação: `src/scripts/README.md`

---

**Autor**: Sistema de Seed MongoDB para Resources API  
**Data**: Novembro 2025  
**Versão**: 1.0
