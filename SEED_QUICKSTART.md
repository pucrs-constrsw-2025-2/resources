# Guia Rápido - Seed do MongoDB

Este guia mostra como popular o banco MongoDB da API de Resources de forma rápida e simples.

## 🚀 Início Rápido (3 passos)

### 1. Instalar Dependências

```powershell
cd backend/resources
npm install
```

### 2. Configurar Variáveis de Ambiente

Certifique-se de que o arquivo `.env` na raiz do projeto contém:

```env
MONGODB_INTERNAL_HOST=localhost
MONGODB_INTERNAL_PORT=27017
RESOURCES_MONGODB_DB=resources
RESOURCES_MONGODB_USER=resources
RESOURCES_MONGODB_PASSWORD=a12345678
```

### 3. Executar o Seed

Escolha uma das opções:

#### Opção A: Usando NPM (Recomendado)
```powershell
# Popular o banco
npm run seed:mongo

# Popular limpando dados existentes
npm run seed:mongo:clean
```

#### Opção B: Usando PowerShell
```powershell
# Popular o banco
.\src\scripts\seed-mongodb.ps1

# Popular limpando dados existentes
.\src\scripts\seed-mongodb.ps1 -Clean
```

## ✅ Verificação

Após o seed, verifique se os dados foram criados:

```powershell
# Testar a API
Invoke-RestMethod -Uri "http://localhost:8187/api/v1/categories" -Method Get
```

Você deve ver 3 categorias:
- Equipamentos Audiovisuais
- Equipamentos de Informática
- Equipamentos de Laboratório

## 🐳 Com Docker

### Subir os containers
```powershell
# Da raiz do projeto
docker-compose up -d mongodb resources

# Aguardar MongoDB iniciar
Start-Sleep -Seconds 5
```

### Popular o banco
```powershell
# Do diretório resources
npm run seed:mongo

# Ou dentro do container
docker-compose exec resources npm run seed:mongo
```

## 📊 Dados Criados

O seed popula o banco com:
- **3 Categorias** de equipamentos
- **9 Features** (propriedades dos equipamentos)
- **10 Resources** (equipamentos) com quantidades
- **30 Feature Values** (valores das propriedades)

## ❓ Problemas Comuns

### "Connection refused"
- Verifique se o MongoDB está rodando: `docker-compose ps mongodb`
- Se não estiver, inicie: `docker-compose up -d mongodb`

### "Authentication failed"
- Verifique as credenciais no arquivo `.env`
- Confirme que o usuário `resources` existe no MongoDB

### "Dados duplicados"
- Use `npm run seed:mongo:clean` para limpar antes de popular

## 📚 Mais Informações

Para detalhes completos sobre todos os scripts disponíveis, consulte:
- `src/scripts/README.md` - Documentação completa dos scripts
- `MONGODB_MIGRATION.md` - Informações sobre a migração para MongoDB

## 🆘 Ajuda

Se encontrar problemas:
1. Verifique se todas as dependências foram instaladas: `npm install`
2. Confirme que o MongoDB está acessível
3. Veja os logs do MongoDB: `docker-compose logs mongodb`
4. Veja os logs da API: `docker-compose logs resources`
