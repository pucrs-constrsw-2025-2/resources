# Resources API

Uma API NestJS para gerenciar resources, categories, features e feature values.

## Requisitos

- Node.js (>= 18 recomendado)
- npm

## Instalação

No diretório do projeto, instale as dependências:

```powershell
npm install
```

## Executando a aplicação

Em desenvolvimento (watch):

```powershell
npm run start:dev
```

Para iniciar a aplicação (produção local, após build):

```powershell
npm run build
npm run start:prod
```

A aplicação por padrão roda na porta 3000. Abra:

- API base: http://localhost:3000/api/v1
- Swagger UI: http://localhost:3000/api

Se quiser mudar a porta, exporte a variável de ambiente PORT antes de iniciar:

```powershell
$env:PORT = 4000; npm run start:dev
```

## Testes

Rode os testes unitários com Jest:

```powershell
npm test
```

## Endpoints principais

Prefixo base: `/api/v1`

Categorias (categories)

- POST   /api/v1/categories
- GET    /api/v1/categories
- GET    /api/v1/categories/:categoryId
- GET    /api/v1/categories?{query}
- PUT    /api/v1/categories/:categoryId
- PATCH  /api/v1/categories/:categoryId
- DELETE /api/v1/categories/:categoryId

Recursos de uma Category

- GET  /api/v1/categories/:categoryId/resources
- POST /api/v1/categories/:categoryId/resources

Recursos (resources)

- POST   /api/v1/resources
- GET    /api/v1/resources
- GET    /api/v1/resources/:resourceId
- GET    /api/v1/resources?{query}
- PUT    /api/v1/resources/:resourceId
- PATCH  /api/v1/resources/:resourceId
- DELETE /api/v1/resources/:resourceId

Features (features)

- POST   /api/v1/features
- GET    /api/v1/features
- GET    /api/v1/features/:featureId
- GET    /api/v1/features?{query}
- PUT    /api/v1/features/:featureId
- PATCH  /api/v1/features/:featureId
- DELETE /api/v1/features/:featureId

Features de uma Category

- GET  /api/v1/categories/:categoryId/features
- POST /api/v1/categories/:categoryId/features

Feature Values (values atribuídos a resources)

- POST   /api/v1/resources/:resourceId/features
- GET    /api/v1/resources/:resourceId/features
- GET    /api/v1/resources/:resourceId/features/:featureValueId
- GET    /api/v1/resources/:resourceId/features?{query}
- PUT    /api/v1/resources/:resourceId/features/:featureValueId
- PATCH  /api/v1/resources/:resourceId/features/:featureValueId
- DELETE /api/v1/resources/:resourceId/features/:featureValueId

Value Types (enum)

- GET /api/v1/value-types

> Observação: Muitos endpoints também possuem variantes na raiz (ex.: `/api/v1/feature-values`), confira o Swagger para ver os esquemas das requests/responses.

## Notas finais

- Em desenvolvimento este projeto usa sqlite (arquivo `resources.db`) e synchronize=true. Em produção utilize migrações e um banco apropriado.
- Se quiser que eu gere uma coleção Postman com essas rotas, me avise e eu crio/atualizo `postman-collection.json`.