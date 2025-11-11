# Resources API - Postman Collection

## 📋 Visão Geral

Esta collection contém todos os endpoints necessários para testar a API Resources de forma completa e organizada. A collection inclui autenticação OAuth/JWT e operações CRUD para todas as entidades.

## 🚀 Como Usar

### 1. Importar Collection e Environment

1. Abra o Postman
2. Clique em **Import**
3. Importe os arquivos:
   - `Resources-API.postman_collection.json` (esta pasta)
   - `ConstrSW.postman_environment.json` (pasta raiz `/postman`)

### 2. Selecionar o Environment

1. No canto superior direito do Postman
2. Selecione o environment **"ConstrSW 2025-2"**
3. Verifique se as seguintes variáveis estão configuradas:
   - `oauth_base`: http://localhost:8080
   - `oauth_username`: testuser@test.com
   - `oauth_password`: test123
   - `resources_base`: http://localhost:8187

### 3. Executar os Testes - Passo a Passo

#### 📌 Passo 1: Verificar Serviços

Antes de começar, certifique-se de que os containers estão rodando:

```bash
docker-compose up -d oauth resources
```

#### 📌 Passo 2: Autenticação (OBRIGATÓRIO)

1. Expanda a pasta **"0. Setup"**
2. Execute **"Auth - Login"**
   - Este endpoint obterá um token JWT válido
   - O token será automaticamente salvo na variável `access_token`
   - O token é válido por 10 minutos

3. Execute **"Health Check"** (opcional)
   - Verifica se a API Resources está funcionando
   - Este endpoint NÃO requer autenticação

#### 📌 Passo 3: Testar Categories

Expanda a pasta **"1. Categories"** e execute na ordem:

1. **Get All Categories** - Lista todas as categorias (incluindo dados do seed)
2. **Create Category** - Cria uma nova categoria de teste
3. **Get Category by ID** - Busca a categoria criada
4. **Update Category (PATCH)** - Atualiza parcialmente
5. **Update Category (PUT)** - Substitui completamente
6. **Get Category Resources** - Lista recursos da categoria
7. **Get Category Features** - Lista features da categoria
8. **Delete Category** - Remove a categoria de teste

#### 📌 Passo 4: Testar Features

Expanda a pasta **"2. Features"** e execute:

1. **Get All Features** - Lista todas as features
2. **Create Feature** - Cria uma nova feature vinculada a uma categoria
3. **Get Feature by ID** - Busca feature específica
4. **Get Features by Category** - Filtra features por categoria
5. **Update Feature (PATCH)** - Atualização parcial
6. **Update Feature (PUT)** - Substituição completa
7. **Delete Feature** - Remove a feature de teste

#### 📌 Passo 5: Testar Resources

Expanda a pasta **"3. Resources"** e execute:

1. **Get All Resources** - Lista todos os recursos
2. **Create Resource** - Cria um novo recurso
3. **Get Resource by ID** - Busca recurso específico
4. **Get Resources by Category** - Filtra recursos por categoria
5. **Update Resource (PATCH)** - Atualização parcial
6. **Update Resource (PUT)** - Substituição completa
7. **Delete Resource** - Remove o recurso de teste

#### 📌 Passo 6: Testar Feature Values

Expanda a pasta **"4. Feature Values"** e execute:

1. **Get All Feature Values** - Lista todos os valores de features
2. **Create Feature Value** - Vincula um valor a um resource e feature
3. **Get Feature Value by ID** - Busca valor específico
4. **Get Feature Values by Resource** - Filtra por recurso
5. **Get Feature Values by Feature** - Filtra por feature
6. **Update Feature Value (PATCH)** - Atualiza o valor
7. **Delete Feature Value** - Remove o valor de teste

#### 📌 Passo 7: Consultar Value Types

Expanda a pasta **"5. Value Types"** e execute:

1. **Get Value Types** - Retorna os tipos de valores disponíveis (STRING, NUMBER, BOOLEAN)

## 🔐 Autenticação

Todos os endpoints (exceto `/health`) requerem autenticação via Bearer Token:

- O token é obtido automaticamente no endpoint **"Auth - Login"**
- O token é salvo automaticamente na variável `{{access_token}}`
- A collection está configurada para usar o token automaticamente em todas as requisições
- Token expira em 10 minutos - se expirar, execute novamente o **"Auth - Login"**

## ✅ Testes Automáticos

Cada requisição inclui testes automáticos que:

- Verificam o status code esperado (200, 201, etc.)
- Validam a estrutura da resposta
- Salvam IDs automaticamente em variáveis para uso nas próximas requisições

Os testes aparecem na aba **"Test Results"** após executar cada requisição.

## 📊 Variáveis de Environment

As seguintes variáveis são gerenciadas automaticamente:

| Variável | Descrição | Gerenciada Por |
|----------|-----------|----------------|
| `access_token` | Token JWT de autenticação | Auth - Login |
| `refresh_token` | Token para renovação | Auth - Login |
| `category_id` | ID de categoria existente | Get All Categories |
| `new_category_id` | ID de categoria criada nos testes | Create Category |
| `feature_id` | ID de feature existente | Get All Features |
| `new_feature_id` | ID de feature criada nos testes | Create Feature |
| `resource_id` | ID de resource existente | Get All Resources |
| `new_resource_id` | ID de resource criado nos testes | Create Resource |
| `feature_value_id` | ID de valor existente | Get All Feature Values |
| `new_feature_value_id` | ID de valor criado nos testes | Create Feature Value |

## 🎯 Executar Collection Completa

Para testar tudo de uma vez:

1. Clique nos 3 pontos ao lado do nome da collection
2. Selecione **"Run collection"**
3. Certifique-se de que **"Auth - Login"** está no topo e será executado primeiro
4. Clique em **"Run Resources API - Complete Test Suite"**

O Postman executará todos os endpoints em sequência e mostrará um relatório completo.

## 🔧 Troubleshooting

### Token Expirado (401 Unauthorized)

Se você receber erro 401 em qualquer endpoint:
1. Execute novamente **"Auth - Login"** para obter um novo token
2. Tente a requisição novamente

### Variáveis Não Encontradas

Se aparecer erro de variável não definida (ex: `category_id`):
1. Execute o endpoint **"Get All Categories"** primeiro
2. O ID será salvo automaticamente
3. Tente novamente a requisição que usa a variável

### Endpoint Não Encontrado (404)

Verifique se:
- Os containers estão rodando: `docker-compose ps`
- A API Resources está na porta 8187: `curl http://localhost:8187/health`

### Erros de Validação

Ao criar/atualizar entidades, certifique-se de:
- **Features**: O `type` deve ser STRING, NUMBER ou BOOLEAN
- **Resources**: O `status` deve ser `true` ou `false`
- **Feature Values**: Use `valueString`, `valueNumber` ou `valueBoolean` de acordo com o tipo da feature

## 📖 Documentação Adicional

Para mais detalhes sobre a implementação de autenticação, consulte:
- `backend/resources/AUTHENTICATION.md`
- `backend/resources/README.md`

## 🌐 Endpoints da API

- **API Resources**: http://localhost:8187/api/v1
- **Swagger Docs**: http://localhost:8187/api
- **Health Check**: http://localhost:8187/health
- **OAuth API**: http://localhost:8180/api/v1

---

**Criado para o projeto Construção de Software 2025-2**
