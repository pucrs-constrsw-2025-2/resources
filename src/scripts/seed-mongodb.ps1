# Script para popular o banco MongoDB usando Node.js
# Este script usa o driver MongoDB nativo via TypeScript

param(
    [string]$MongoUri = "mongodb://resources:a12345678@localhost:27017/resources?authSource=resources",
    [switch]$Clean
)

Write-Host "🌱 Seed do MongoDB (Node.js) - Resources API" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""

# Verificar se estamos no diretório correto
$packageJson = Join-Path $PSScriptRoot ".." ".." "package.json"
if (-not (Test-Path $packageJson)) {
    Write-Host "❌ Erro: package.json não encontrado" -ForegroundColor Red
    Write-Host "   Execute este script a partir do diretório resources" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 Verificando dependências..." -ForegroundColor Cyan

# Verificar se node_modules existe
$nodeModules = Join-Path $PSScriptRoot ".." ".." "node_modules"
if (-not (Test-Path $nodeModules)) {
    Write-Host "⚠️  node_modules não encontrado. Instalando dependências..." -ForegroundColor Yellow
    Push-Location (Join-Path $PSScriptRoot ".." "..")
    npm install
    Pop-Location
}

Write-Host "✅ Dependências OK" -ForegroundColor Green
Write-Host ""

# Definir variáveis de ambiente
$env:MONGO_URI = $MongoUri
if ($Clean) {
    $env:CLEAN_DB = "true"
    Write-Host "🧹 Modo de limpeza ativado - removendo dados existentes" -ForegroundColor Yellow
} else {
    $env:CLEAN_DB = "false"
}

Write-Host "🔗 MongoDB URI: $MongoUri" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Executando seed..." -ForegroundColor Yellow
Write-Host ""

# Executar o script de seed
try {
    Push-Location (Join-Path $PSScriptRoot ".." "..")
    
    npx ts-node -r tsconfig-paths/register src/scripts/seed-mongodb.ts
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Seed concluído com sucesso!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ Erro ao executar seed (código: $LASTEXITCODE)" -ForegroundColor Red
        exit $LASTEXITCODE
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ Erro ao executar seed: $_" -ForegroundColor Red
    exit 1
} finally {
    Pop-Location
}

Write-Host ""
Write-Host "💡 Dicas:" -ForegroundColor Cyan
Write-Host "   - Para limpar o banco antes de popular, use: .\seed-mongodb.ps1 -Clean" -ForegroundColor Gray
Write-Host "   - Para usar outro URI: .\seed-mongodb.ps1 -MongoUri 'mongodb://...''" -ForegroundColor Gray
Write-Host "   - Você também pode usar: npm run seed:mongo" -ForegroundColor Gray
Write-Host ""
