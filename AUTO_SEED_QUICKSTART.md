# 🚀 Guia Rápido - Ativar Auto-Seed

## Para que serve?

O auto-seed popula automaticamente o banco MongoDB com dados iniciais quando a aplicação inicia, **se o banco estiver vazio**.

## Como ativar (2 minutos)

### Opção 1: Arquivo .env (Recomendado)

1. Abra ou crie o arquivo `.env` na **raiz do projeto** (não dentro de resources)
2. Adicione a linha:
   ```env
   AUTO_SEED=true
   ```
3. Suba os containers:
   ```powershell
   docker-compose up -d
   ```

### Opção 2: Docker Compose

Se você não quer usar arquivo .env, pode adicionar direto no `docker-compose.yml`:

```yaml
services:
  resources:
    environment:
      - AUTO_SEED=true
```

### Opção 3: Linha de Comando (Desenvolvimento Local)

```powershell
# Windows PowerShell
$env:AUTO_SEED = "true"
npm run start:dev

# Linux/Mac
export AUTO_SEED=true
npm run start:dev
```

## Como verificar se funcionou

### 1. Veja os logs
```powershell
docker-compose logs resources
```

### 2. Procure por estas mensagens
```
[AutoSeedService] 🔍 Verificando se o banco precisa ser populado...
[AutoSeedService] 🌱 Banco vazio detectado. Iniciando auto-seed...
[AutoSeedService] ✅ Categorias criadas
[AutoSeedService] ✅ Features criadas
[AutoSeedService] ✅ Resources criados
[AutoSeedService] 🎉 Auto-seed concluído com sucesso!
```

### 3. Teste a API
```powershell
Invoke-RestMethod -Uri "http://localhost:8187/api/v1/categories"
```

Você deve ver 3 categorias retornadas.

## Desativar

Para desativar o auto-seed:

```env
AUTO_SEED=false
```

Ou simplesmente remova a linha do .env.

## ❓ FAQ Rápido

**P: O auto-seed vai duplicar dados toda vez que eu reiniciar?**  
R: Não! Ele só popula se o banco estiver completamente vazio.

**P: E se eu já tiver alguns dados no banco?**  
R: O auto-seed não vai executar. Ele só popula banco vazio.

**P: Posso usar junto com os scripts manuais?**  
R: Sim! Você pode ter `AUTO_SEED=true` e ainda usar `npm run seed:mongo` quando quiser.

**P: E se o auto-seed falhar?**  
R: A aplicação continua funcionando normalmente. Você pode popular manualmente depois.

**P: Onde estão os dados que serão populados?**  
R: Os mesmos dados dos scripts manuais: 3 categorias, 9 features, 10 resources e 30 feature values.

## 📚 Mais Informações

- **[AUTO_SEED.md](AUTO_SEED.md)** - Documentação completa
- **[AUTO_SEED_IMPLEMENTATION.md](AUTO_SEED_IMPLEMENTATION.md)** - Detalhes da implementação

---

**TL;DR**: Adicione `AUTO_SEED=true` no `.env` da raiz do projeto e suba os containers. Pronto! 🎉
