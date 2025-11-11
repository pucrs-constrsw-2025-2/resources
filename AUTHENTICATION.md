# Autenticação - Resources API

## Visão Geral

A API Resources foi configurada para proteger todos os endpoints com autenticação via OAuth/JWT, exceto o endpoint de health check.

## Implementação

### AuthGuard

Criado em `src/guards/auth.guard.ts`, o guard implementa a validação de tokens JWT através do serviço OAuth interno.

**Como funciona:**
1. Intercepta todas as requisições aos endpoints protegidos
2. Extrai o token do header `Authorization: Bearer <token>`
3. Envia o token para validação no serviço OAuth (`http://oauth:8180/validate`)
4. Se válido, permite o acesso e anexa os dados do usuário ao request
5. Se inválido ou ausente, retorna erro 401 Unauthorized

### Endpoints Protegidos

Todos os seguintes controllers estão protegidos com `@UseGuards(AuthGuard)`:

- **Categories** (`/api/v1/categories`)
  - POST, GET, GET/:id, PATCH/:id, PUT/:id, DELETE/:id
  - GET/:id/resources, POST/:id/resources
  - GET/:id/features, POST/:id/features

- **Features** (`/api/v1/features`)
  - POST, GET, GET/:id, GET/category/:categoryId
  - PATCH/:id, PUT/:id, DELETE/:id

- **Resources** (`/api/v1/resources`)
  - POST, GET, GET/:id, GET/category/:categoryId
  - PATCH/:id, PUT/:id, DELETE/:id

- **Feature Values** (`/api/v1/feature-values`)
  - POST, GET, GET/:id
  - GET/resource/:resourceId
  - GET/feature/:featureId
  - Endpoints aninhados em resources

- **Value Types** (`/api/v1/value-types`)
  - GET (retorna enum de tipos)

### Endpoints Não Protegidos

- **Health Check** (`/health`)
  - Usado para verificação de saúde do container
  - Não requer autenticação

## Configuração

### Dependências Adicionadas

```json
{
  "@nestjs/axios": "^3.0.0",
  "axios": "^1.6.0"
}
```

### Módulos Importados

O `HttpModule` foi adicionado ao `AppModule` para permitir requisições HTTP ao serviço OAuth.

### Swagger/OpenAPI

A documentação Swagger foi configurada com suporte a Bearer Authentication:

```typescript
.addBearerAuth()
```

Todos os controllers incluem a anotação `@ApiBearerAuth()` para documentar a necessidade de autenticação.

## Uso

### Requisição Sem Autenticação

```bash
curl -i http://localhost:8187/api/v1/categories
```

**Resposta:**
```
HTTP/1.1 401 Unauthorized
{"message":"Missing or invalid Authorization header","error":"Unauthorized","statusCode":401}
```

### Requisição Com Autenticação

```bash
curl -i -H "Authorization: Bearer <seu-token-jwt>" http://localhost:8187/api/v1/categories
```

**Resposta (se token válido):**
```
HTTP/1.1 200 OK
[...dados das categorias...]
```

## Variáveis de Ambiente

O AuthGuard utiliza as seguintes variáveis de ambiente configuradas no `docker-compose.yml`:

- `OAUTH_INTERNAL_HOST`: Host do serviço OAuth (padrão: oauth)
- `OAUTH_INTERNAL_API_PORT`: Porta do serviço OAuth (padrão: 8180)

## Testando Autenticação

1. **Obter Token**: Use o serviço OAuth ou BFF para obter um token JWT válido
2. **Testar Endpoint**: Faça uma requisição incluindo o header `Authorization: Bearer <token>`
3. **Verificar Resposta**: Tokens válidos retornam 200, tokens inválidos retornam 401

## Documentação Swagger

Acesse a documentação interativa em: `http://localhost:8187/api`

Use o botão "Authorize" no canto superior direito para inserir seu token JWT e testar os endpoints protegidos diretamente pela interface do Swagger.
