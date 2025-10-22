# Configuração do Resources com MongoDB

## Mudanças Realizadas

Este microserviço foi migrado de SQLite para MongoDB e configurado para usar as variáveis de ambiente do arquivo `.env` da pasta base.

### 1. Pacotes Instalados

```bash
npm install @nestjs/config @nestjs/mongoose mongoose
npm uninstall @nestjs/typeorm typeorm sqlite3
```

### 2. Variáveis de Ambiente Utilizadas

As seguintes variáveis do arquivo `.env` da raiz são utilizadas:

- `MONGODB_INTERNAL_HOST` - Host do MongoDB (mongodb)
- `MONGODB_INTERNAL_PORT` - Porta do MongoDB (27017)
- `RESOURCES_MONGODB_DB` - Nome do banco de dados (resources)
- `RESOURCES_MONGODB_USER` - Usuário do banco (resources)
- `RESOURCES_MONGODB_PASSWORD` - Senha do banco (a12345678)
- `RESOURCES_INTERNAL_PROTOCOL` - Protocolo (http)
- `RESOURCES_INTERNAL_HOST` - Host interno (resources)
- `RESOURCES_INTERNAL_API_PORT` - Porta da API (8080)
- `RESOURCES_INTERNAL_DEBUG_PORT` - Porta de debug (9229)
- `RESOURCES_EXTERNAL_PROTOCOL` - Protocolo externo (http)
- `RESOURCES_EXTERNAL_HOST` - Host externo (localhost)
- `RESOURCES_EXTERNAL_API_PORT` - Porta externa da API (8187)
- `RESOURCES_EXTERNAL_DEBUG_PORT` - Porta externa de debug (8287)

### 3. Arquivos Modificados

#### Entidades (TypeORM → Mongoose)
- `src/entities/category.entity.ts`
- `src/entities/feature.entity.ts`
- `src/entities/resource.entity.ts`
- `src/entities/feature-value.entity.ts`

#### Services (Repository → Model)
- `src/services/category.service.ts`
- `src/services/feature.service.ts`
- `src/services/resource.service.ts`
- `src/services/feature-value.service.ts`

#### Configuração
- `src/app.module.ts` - Configurado MongooseModule com variáveis de ambiente
- `src/main.ts` - Já estava usando `dotenv/config`

### 4. Arquivos Criados

- `Dockerfile` - Multi-stage build para produção
- `.dockerignore` - Exclusões para o build do Docker

### 5. Docker Compose

O serviço `resources` no `docker-compose.yml` foi atualizado para:
- Incluir todas as variáveis de ambiente necessárias
- Adicionar dependência do MongoDB
- Manter a porta exposta conforme configuração

### 6. Como Executar

#### Desenvolvimento Local

```bash
cd backend/resources
npm install
npm run start:dev
```

#### Com Docker Compose

```bash
# Na raiz do projeto
docker-compose up resources
```

### 7. Estrutura MongoDB

O MongoDB será acessado com as seguintes credenciais:
- URI: `mongodb://resources:a12345678@mongodb:27017/resources?authSource=admin`
- Database: `resources`
- Collections: `categories`, `features`, `resources`, `feature_values`

### 8. Endpoints Disponíveis

A API estará disponível em:
- **Interno (Docker)**: `http://resources:8080/api/v1`
- **Externo**: `http://localhost:8187/api/v1`
- **Swagger**: `http://localhost:8187/api`

### 9. Notas Importantes

1. O MongoDB usa ObjectId ao invés de UUID para IDs
2. As relações agora usam referências (`ref`) ao invés de joins
3. O `populate()` é usado para carregar dados relacionados
4. O schema é validado pelo Mongoose, não mais pelo TypeORM

### 10. Healthcheck

O healthcheck do Docker verifica o endpoint `/api/v1/categories` para garantir que a API está funcionando.
