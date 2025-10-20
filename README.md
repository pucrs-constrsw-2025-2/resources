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

## Testes

Rode os testes unitários com Jest:

```powershell
npm test
```

## Endpoints principais

Prefixo base: `/api/v1`

- Consulte a lista completa de endpoints no final deste README (ou abra o Swagger em /api).

## Rodando o seed (passo a passo)

O projeto inclui o script de seed em `src/scripts/seed.ts`. Ele popula o banco sqlite (`resources.db`) com categories, features, resources e feature-values.

Passos para rodar o seed (PowerShell):

1) Pare a aplicação se ela estiver rodando (fechar `npm run start:dev`), pois o script usa o mesmo DB.

2) (Opcional) Remover o arquivo de banco existente para um estado limpo:

```powershell
# remove resources.db se existir (silencioso se não existir)
Remove-Item -Path .\resources.db -Force -ErrorAction SilentlyContinue
```

3) Executar o seed via npm script:

```powershell
npm run seed
```

Saída esperada: logs informando etapas ("Starting database seeding...", "Categories created", "Features created", "Resources created", "Feature values created", "Database seeding completed successfully!") e um resumo com os counts.

4) Iniciar a API (se necessário) e testar endpoints:

```powershell
npm run start:dev
# Exemplo de verificação
Invoke-RestMethod -Method Get -Uri "http://localhost:3000/api/v1/categories"
```

Notas importantes

- O seed atual não é idempotente — executá-lo repetidamente irá inserir duplicatas. Para reexecutar a partir de um estado limpo, remova `resources.db` antes (passo 2 acima).
- Se quiser, posso tornar o seed idempotente (upsert por nome) ou criar um script `npm run seed:clean` que faça a limpeza automaticamente.
- O seed usa os serviços do Nest (CategoryService, FeatureService, ResourceService, FeatureValueService), então ele respeita as validações e relacionamentos da aplicação.

## Exemplos rápidos de requests

Veja exemplos de cURL e PowerShell para as operações mais comuns (criar/listar). Para uma lista completa, abra o Swagger em `/api`.

(... a seção de endpoints e exemplos pode ser consultada no README anterior; avise se quiser que eu reimporte os exemplos aqui.)

---

## Notas finais

- Em desenvolvimento este projeto usa sqlite (arquivo `resources.db`) e synchronize=true. Em produção utilize migrações e um banco apropriado.
- Se quiser que eu gere uma coleção Postman com essas rotas, me avise e eu crio/atualizo `postman-collection.json`.
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

## Exemplos de request

Assumindo: API em http://localhost:3000 e prefixo `/api/v1`.

1) Criar uma Category

cURL:

```bash
curl -X POST "http://localhost:3000/api/v1/categories" \
  -H "Content-Type: application/json" \
  -d '{"name":"Electronics"}'
```

PowerShell (Invoke-RestMethod):

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/v1/categories" -ContentType "application/json" -Body (@{ name = 'Electronics' } | ConvertTo-Json)
```

2) Criar um Resource dentro de uma Category (substitua <categoryId>)

cURL:

```bash
curl -X POST "http://localhost:3000/api/v1/categories/<categoryId>/resources" \
  -H "Content-Type: application/json" \
  -d '{"name":"iPhone 14","quantity":10,"status":true}'
```

PowerShell:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/v1/categories/<categoryId>/resources" -ContentType "application/json" -Body (@{ name='iPhone 14'; quantity=10; status=$true } | ConvertTo-Json)
```

3) Criar um Feature em uma Category (substitua <categoryId>)

cURL:

```bash
curl -X POST "http://localhost:3000/api/v1/categories/<categoryId>/features" \
  -H "Content-Type: application/json" \
  -d '{"name":"Screen Size","type":"STRING"}'
```

PowerShell:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/v1/categories/<categoryId>/features" -ContentType "application/json" -Body (@{ name='Screen Size'; type='STRING' } | ConvertTo-Json)
```

4) Atribuir um Feature Value a um Resource (substitua <resourceId> e <featureId>)

cURL:

```bash
curl -X POST "http://localhost:3000/api/v1/resources/<resourceId>/features" \
  -H "Content-Type: application/json" \
  -d '{"featureId":"<featureId>", "valueString":"6.1 inches"}'
```

PowerShell:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/v1/resources/<resourceId>/features" -ContentType "application/json" -Body (@{ featureId='<featureId>'; valueString='6.1 inches' } | ConvertTo-Json)
```

5) Listar Resources (opcional: filtrar por categoryId)

cURL:

```bash
curl "http://localhost:3000/api/v1/resources"
# ou filtrando por category
curl "http://localhost:3000/api/v1/resources?categoryId=<categoryId>"
```

PowerShell:

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:3000/api/v1/resources"
```

---

Se quiser mais exemplos (payloads com todos os campos, respostas completas ou coleção Postman), eu gero em seguida.
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