# Script para popular o banco MongoDB com dados iniciais
# Este script usa o MongoDB Shell (mongosh) para executar o seed

param(
    [string]$MongoUri = "mongodb://resources:a12345678@localhost:27017/resources?authSource=resources",
    [switch]$Clean
)

Write-Host "🌱 Seed do MongoDB - Resources API" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Verificar se mongosh está instalado
$mongoshPath = Get-Command mongosh -ErrorAction SilentlyContinue
if (-not $mongoshPath) {
    Write-Host "❌ Erro: mongosh não está instalado ou não está no PATH" -ForegroundColor Red
    Write-Host "   Instale o MongoDB Shell: https://www.mongodb.com/try/download/shell" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ mongosh encontrado: $($mongoshPath.Source)" -ForegroundColor Green
Write-Host ""

# Caminho do script de seed
$scriptPath = Join-Path $PSScriptRoot "seed-mongo.js"

if (-not (Test-Path $scriptPath)) {
    Write-Host "❌ Erro: Arquivo seed-mongo.js não encontrado em:" -ForegroundColor Red
    Write-Host "   $scriptPath" -ForegroundColor Yellow
    exit 1
}

Write-Host "📂 Script de seed: $scriptPath" -ForegroundColor Cyan
Write-Host "🔗 MongoDB URI: $MongoUri" -ForegroundColor Cyan
Write-Host ""

# Executar o seed
Write-Host "🚀 Executando seed..." -ForegroundColor Yellow
Write-Host ""

try {
    # Se Clean foi especificado, adicionar comandos de limpeza
    if ($Clean) {
        Write-Host "🧹 Modo de limpeza ativado - removendo dados existentes" -ForegroundColor Yellow
        Write-Host ""
        
        $cleanScript = @"
db = db.getSiblingDB('resources');
print('🧹 Limpando collections...');
db.categories.deleteMany({});
db.features.deleteMany({});
db.resources.deleteMany({});
db.feature_values.deleteMany({});
print('✅ Collections limpas');
"@
        
        $cleanScript | mongosh $MongoUri --quiet
    }
    
    # Executar o script de seed
    Get-Content $scriptPath | mongosh $MongoUri
    
    Write-Host ""
    Write-Host "✅ Seed concluído com sucesso!" -ForegroundColor Green
    
} catch {
    Write-Host ""
    Write-Host "❌ Erro ao executar seed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "💡 Dicas:" -ForegroundColor Cyan
Write-Host "   - Para limpar o banco antes de popular, use: .\seed-mongo.ps1 -Clean" -ForegroundColor Gray
Write-Host "   - Para usar outro URI: .\seed-mongo.ps1 -MongoUri 'mongodb://...''" -ForegroundColor Gray
Write-Host ""
