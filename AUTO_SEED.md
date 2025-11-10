# 🤖 Auto-Seed - Populate Automático do Banco

## 📋 O que é?

O **Auto-Seed** é um serviço que verifica automaticamente se o banco MongoDB está vazio quando a aplicação inicia e, se estiver, popula com dados iniciais.

## ✨ Características

- ✅ **Automático**: Executa na inicialização da aplicação
- ✅ **Inteligente**: Só popula se o banco estiver vazio
- ✅ **Seguro**: Não duplica dados em reinicializações
- ✅ **Opcional**: Pode ser habilitado/desabilitado via variável de ambiente
- ✅ **Não-bloqueante**: Se falhar, a aplicação continua funcionando

## 🚀 Como Usar

### Habilitar Auto-Seed

Defina a variável de ambiente `AUTO_SEED=true`:

#### No arquivo .env (raiz do projeto)
```env
AUTO_SEED=true
```

#### No Docker Compose
```yaml
services:
  resources:
    environment:
      - AUTO_SEED=true
```

#### No terminal (desenvolvimento local)
```powershell
$env:AUTO_SEED = "true"
npm run start:dev
```

### Desabilitar Auto-Seed

Simplesmente não defina a variável ou defina como `false`:

```env
AUTO_SEED=false
```

Ou remova a variável completamente.

## 🔍 Como Funciona

### 1. Verificação na Inicialização
Quando a aplicação sobe, o `AutoSeedService` é automaticamente executado (via `OnModuleInit`).

### 2. Checagem de Dados
O serviço verifica se já existem categorias ou resources no banco:
```typescript
const categoriesCount = await this.categoryModel.countDocuments();
const resourcesCount = await this.resourceModel.countDocuments();
```

### 3. Decisão
- **Se houver dados**: Não faz nada, apenas loga que o banco já está populado
- **Se estiver vazio E AUTO_SEED=true**: Executa o seed automaticamente
- **Se estiver vazio E AUTO_SEED≠true**: Não faz nada

### 4. Execução do Seed
Se necessário, popula o banco com todos os dados iniciais (mesmos dados do `seed.ts`).

## 📊 Logs

### Quando AUTO_SEED está desabilitado
```
[AutoSeedService] Auto-seed desabilitado (AUTO_SEED !== true)
```

### Quando o banco já tem dados
```
[AutoSeedService] 🔍 Verificando se o banco precisa ser populado...
[AutoSeedService] ✅ Banco já contém dados. Auto-seed não será executado.
[AutoSeedService] 📊 Dados existentes: 3 categorias, 10 resources
```

### Quando o seed é executado
```
[AutoSeedService] 🔍 Verificando se o banco precisa ser populado...
[AutoSeedService] 🌱 Banco vazio detectado. Iniciando auto-seed...
[AutoSeedService] ✅ Categorias criadas
[AutoSeedService] ✅ Features criadas
[AutoSeedService] ✅ Resources criados
[AutoSeedService] ✅ Feature values criados
[AutoSeedService] 🎉 Auto-seed concluído com sucesso!
[AutoSeedService] 📊 Resumo: 3 categorias, 9 features, 10 resources, 30 feature values
```

### Quando há erro
```
[AutoSeedService] ❌ Erro durante execução do seed: [detalhes do erro]
[AutoSeedService] Erro durante auto-seed: [stack trace]
```

**Importante**: Mesmo com erro, a aplicação continua funcionando normalmente.

## 🐳 Uso com Docker

### Configuração Recomendada

No `.env` da raiz:
```env
AUTO_SEED=true
```

### Fluxo Completo
```powershell
# 1. Subir MongoDB
docker-compose up -d mongodb

# 2. Subir Resources API (com AUTO_SEED=true)
docker-compose up -d resources

# 3. Verificar logs do auto-seed
docker-compose logs resources
```

Você verá os logs do auto-seed indicando se o banco foi populado.

## 🔄 Cenários de Uso

### Cenário 1: Primeira Inicialização (Banco Vazio)
```
✅ AUTO_SEED=true
✅ Banco vazio
➡️ Seed é executado automaticamente
```

### Cenário 2: Reinicialização (Banco com Dados)
```
✅ AUTO_SEED=true
✅ Banco já tem dados
➡️ Seed NÃO é executado (não duplica)
```

### Cenário 3: Auto-Seed Desabilitado
```
❌ AUTO_SEED=false (ou não definido)
✅ Banco vazio
➡️ Seed NÃO é executado
```

### Cenário 4: Resetar Dados
```
# 1. Limpar banco
docker-compose exec mongodb mongosh "mongodb://..." --eval "db.dropDatabase()"

# 2. Reiniciar API (com AUTO_SEED=true)
docker-compose restart resources

# 3. Auto-seed executa novamente
```

## 🆚 Comparação: Auto-Seed vs Seed Manual

| Característica | Auto-Seed | Seed Manual |
|---------------|-----------|-------------|
| Execução | Automática na inicialização | Manual via script |
| Comando | Nenhum (automático) | `npm run seed:mongo` |
| Duplicação | Evita automaticamente | Depende do script usado |
| Configuração | Variável de ambiente | Linha de comando |
| Uso | Produção/Docker | Desenvolvimento/Setup inicial |

## 💡 Quando Usar Cada Um?

### Use Auto-Seed quando:
- ✅ Deploy em produção/staging
- ✅ Ambiente Docker automatizado
- ✅ CI/CD pipelines
- ✅ Quer garantir que o banco sempre tenha dados iniciais
- ✅ Múltiplos desenvolvedores/ambientes

### Use Seed Manual quando:
- ✅ Desenvolvimento local
- ✅ Precisa resetar dados específicos
- ✅ Quer controle total sobre quando popular
- ✅ Testando diferentes conjuntos de dados

## 🔧 Troubleshooting

### Auto-Seed não está executando

**Verifique:**
1. `AUTO_SEED=true` está definido?
   ```powershell
   docker-compose exec resources printenv AUTO_SEED
   ```

2. O banco realmente está vazio?
   ```powershell
   docker-compose exec mongodb mongosh "mongodb://..." --eval "db.categories.countDocuments()"
   ```

3. Veja os logs:
   ```powershell
   docker-compose logs resources | Select-String "AutoSeedService"
   ```

### Auto-Seed executa toda vez

**Problema**: O banco está sendo limpo entre reinicializações  
**Solução**: Verificar se o volume do MongoDB está persistindo dados

```yaml
volumes:
  mongodb_data:
    driver: local
```

### Erro durante Auto-Seed

**Sintoma**: Logs mostram erro mas aplicação continua
```
[AutoSeedService] ❌ Erro durante execução do seed
```

**Soluções**:
1. Verificar conexão com MongoDB
2. Verificar credenciais
3. Executar seed manual para ver erro detalhado:
   ```powershell
   npm run seed:mongo
   ```

## 🎯 Melhores Práticas

### ✅ Fazer

1. **Habilitar em produção**:
   ```env
   AUTO_SEED=true
   ```

2. **Usar volumes persistentes** para não perder dados:
   ```yaml
   volumes:
     - mongodb_data:/data/db
   ```

3. **Monitorar logs** na primeira inicialização:
   ```powershell
   docker-compose logs -f resources
   ```

### ❌ Não Fazer

1. **Não confiar apenas no auto-seed** para backups
2. **Não desabilitar em produção** (a menos que tenha outro mecanismo)
3. **Não modificar dados iniciais** sem atualizar o `AutoSeedService`

## 📝 Customização

Para adicionar/modificar dados do auto-seed, edite:
```
src/services/auto-seed.service.ts
```

O código está estruturado da mesma forma que `src/scripts/seed.ts`, então você pode copiar/colar mudanças entre eles.

## 🔗 Scripts Relacionados

- **seed.ts** - Seed manual usando NestJS services
- **seed-mongodb.ts** - Seed manual direto via MongoDB driver
- **seed-mongo.js** - Seed manual via MongoDB Shell
- **auto-seed.service.ts** - Este serviço (auto-seed)

## 📚 Documentação Adicional

- [SEED_QUICKSTART.md](SEED_QUICKSTART.md) - Guia rápido de seed manual
- [SEED_DOCS_INDEX.md](SEED_DOCS_INDEX.md) - Índice de toda documentação
- [MONGODB_MIGRATION.md](MONGODB_MIGRATION.md) - Configuração do MongoDB

---

**💡 Dica**: Para ambientes de desenvolvimento, você pode deixar `AUTO_SEED=false` e usar os scripts manuais. Para produção/Docker, use `AUTO_SEED=true` para garantir que o banco sempre tenha dados iniciais.
