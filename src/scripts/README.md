# MongoDB Seed Scripts - Resources API

Este diretório contém scripts para popular o banco de dados MongoDB com dados iniciais da API de Resources.

## 📁 Arquivos

### Dados
- **`seed-data.json`** - Arquivo JSON com todos os dados estruturados (categorias, features, resources e feature values)

### Scripts de Seed
1. **`seed.ts`** - Script original usando NestJS services (funciona com SQLite e MongoDB)
2. **`seed-mongodb.ts`** - Script direto usando driver MongoDB nativo do Node.js
3. **`seed-mongo.js`** - Script para MongoDB Shell (mongosh)

### Scripts PowerShell
- **`seed-mongo.ps1`** - Wrapper PowerShell para executar seed-mongo.js via mongosh
- **`seed-mongodb.ps1`** - Wrapper PowerShell para executar seed-mongodb.ts via Node.js

## 🚀 Como Usar

### Opção 1: Via NPM (Recomendado)

#### Usando NestJS Services
```powershell
# Popula o banco usando os services do NestJS
npm run seed
```

#### Usando Driver MongoDB Nativo
```powershell
# Popula o banco conectando diretamente ao MongoDB
npm run seed:mongo

# Com limpeza automática antes de popular
npm run seed:mongo:clean
```

### Opção 2: Via PowerShell

#### Usando MongoDB Shell (mongosh)
```powershell
# Executar do diretório resources/src/scripts
.\seed-mongo.ps1

# Com limpeza do banco antes
.\seed-mongo.ps1 -Clean

# Com URI personalizada
.\seed-mongo.ps1 -MongoUri "mongodb://user:pass@host:port/database"
```

#### Usando Node.js/TypeScript
```powershell
# Executar do diretório resources/src/scripts
.\seed-mongodb.ps1

# Com limpeza do banco antes
.\seed-mongodb.ps1 -Clean

# Com URI personalizada
.\seed-mongodb.ps1 -MongoUri "mongodb://user:pass@host:port/database"
```

### Opção 3: Diretamente com mongosh

```powershell
# Do diretório resources/src/scripts
mongosh "mongodb://resources:a12345678@localhost:27017/resources?authSource=resources" < seed-mongo.js
```

### Opção 4: Diretamente com ts-node

```powershell
# Do diretório resources/
npx ts-node -r tsconfig-paths/register src/scripts/seed-mongodb.ts
```

## 🔧 Configuração

### Variáveis de Ambiente

Os scripts usam as seguintes variáveis (com valores padrão):

```bash
# Para seed-mongodb.ts
MONGO_URI=mongodb://resources:a12345678@localhost:27017/resources?authSource=resources
CLEAN_DB=false  # true para limpar o banco antes de popular

# Para seed.ts (via NestJS)
MONGODB_INTERNAL_HOST=localhost
MONGODB_INTERNAL_PORT=27017
RESOURCES_MONGODB_USER=resources
RESOURCES_MONGODB_PASSWORD=a12345678
RESOURCES_MONGODB_DB=resources
```

### Arquivo .env

Certifique-se de que o arquivo `.env` na raiz do projeto está configurado corretamente:

```env
MONGODB_INTERNAL_HOST=mongodb
MONGODB_INTERNAL_PORT=27017
RESOURCES_MONGODB_DB=resources
RESOURCES_MONGODB_USER=resources
RESOURCES_MONGODB_PASSWORD=a12345678
```

## 📊 Dados Populados

O seed cria os seguintes dados:

### Categorias (3)
- Equipamentos Audiovisuais
- Equipamentos de Informática
- Equipamentos de Laboratório

### Features (9)
**Audiovisuais:**
- Resolução (STRING)
- Conectividade (STRING)
- Portátil (BOOLEAN)

**Informática:**
- Processador (STRING)
- Memória RAM (STRING)
- Armazenamento (STRING)

**Laboratório:**
- Capacidade (STRING)
- Voltagem (STRING)
- Calibrado (BOOLEAN)

### Resources (10)
**Audiovisuais:**
- Projetor Epson PowerLite (12 unidades)
- Microfone sem fio Shure (8 unidades)
- Caixa de Som Amplificada (6 unidades)
- Câmera de Vídeo Sony 4K (4 unidades)

**Informática:**
- Notebook Dell Inspiron (20 unidades)
- Tablet Samsung Galaxy Tab (15 unidades)
- Adaptador HDMI/VGA (25 unidades)

**Laboratório:**
- Osciloscópio Digital (5 unidades)
- Multímetro Digital Fluke (10 unidades)
- Fonte de Alimentação DC (8 unidades, status: false)

### Feature Values (30)
Cada resource possui valores para todas as features da sua categoria.

## 🔄 Diferenças entre os Scripts

### seed.ts (NestJS Services)
- ✅ Usa os services e DTOs do NestJS
- ✅ Respeita todas as validações da aplicação
- ✅ Funciona com SQLite e MongoDB
- ⚠️ Requer que a aplicação esteja configurada corretamente
- ⚠️ Mais lento (overhead do NestJS)

### seed-mongodb.ts (Driver Nativo)
- ✅ Conexão direta ao MongoDB
- ✅ Mais rápido
- ✅ Não requer configuração do NestJS
- ✅ Pode limpar o banco antes (CLEAN_DB=true)
- ⚠️ Não passa pelas validações do NestJS
- ⚠️ Apenas para MongoDB

### seed-mongo.js (MongoDB Shell)
- ✅ Executa no mongosh (não requer Node.js)
- ✅ Muito rápido
- ✅ Pode ser executado remotamente
- ✅ Ideal para automação
- ⚠️ Não passa pelas validações do NestJS
- ⚠️ Apenas para MongoDB

## 🧪 Testando o Seed

Após executar o seed, você pode verificar os dados:

### Via mongosh
```javascript
use resources
db.categories.countDocuments()      // Deve retornar 3
db.features.countDocuments()        // Deve retornar 9
db.resources.countDocuments()       // Deve retornar 10
db.feature_values.countDocuments()  // Deve retornar 30
```

### Via API
```powershell
# Verificar categorias
Invoke-RestMethod -Uri "http://localhost:8187/api/v1/categories" -Method Get

# Verificar resources
Invoke-RestMethod -Uri "http://localhost:8187/api/v1/resources" -Method Get

# Verificar features
Invoke-RestMethod -Uri "http://localhost:8187/api/v1/features" -Method Get
```

## 🐳 Usando com Docker

### Docker Compose
O seed pode ser executado após o container subir:

```powershell
# Subir os containers
docker-compose up -d mongodb resources

# Aguardar alguns segundos para o MongoDB iniciar
Start-Sleep -Seconds 5

# Executar seed (do host)
npm run seed:mongo

# Ou executar dentro do container
docker-compose exec resources npm run seed:mongo
```

### Seed Automático no Dockerfile
Se desejar que o seed execute automaticamente ao subir o container, adicione ao Dockerfile:

```dockerfile
# Adicionar ao final do Dockerfile
CMD ["sh", "-c", "npm run seed:mongo && npm run start:prod"]
```

## 🚨 Troubleshooting

### Erro: "mongosh não encontrado"
Instale o MongoDB Shell: https://www.mongodb.com/try/download/shell

### Erro: "Connection refused"
- Verifique se o MongoDB está rodando
- Confirme a URI de conexão
- Verifique as credenciais

### Erro: "Authentication failed"
- Verifique usuário e senha no URI
- Confirme que o usuário tem permissões no database
- Verifique o `authSource` no URI

### Seed cria dados duplicados
Use a opção `-Clean` ou `CLEAN_DB=true` para limpar antes:
```powershell
npm run seed:mongo:clean
# ou
.\seed-mongodb.ps1 -Clean
```

## 📝 Customização

### Adicionando Novos Dados

Edite o arquivo `seed-data.json` para adicionar ou modificar dados:

```json
{
  "categories": [
    {
      "name": "Nova Categoria"
    }
  ],
  "features": [
    {
      "name": "Nova Feature",
      "type": "STRING",
      "categoryName": "Nova Categoria"
    }
  ],
  "resources": [
    {
      "name": "Novo Resource",
      "quantity": 5,
      "status": true,
      "categoryName": "Nova Categoria",
      "featureValues": {
        "Nova Feature": "Valor"
      }
    }
  ]
}
```

### Criando Seed Idempotente

Para tornar o seed idempotente (não criar duplicatas), modifique os scripts para usar `updateOne` com `upsert`:

```typescript
// Exemplo
await categoriesCollection.updateOne(
  { name: category.name },
  { 
    $set: { 
      name: category.name,
      updatedAt: new Date()
    },
    $setOnInsert: {
      createdAt: new Date()
    }
  },
  { upsert: true }
);
```

## 📚 Referências

- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/)
- [NestJS Mongoose](https://docs.nestjs.com/techniques/mongodb)
