# Script para verificar o conteúdo do banco MongoDB após o seed
# Este script conecta ao MongoDB e exibe um resumo dos dados

param(
    [string]$MongoUri = "mongodb://resources:a12345678@localhost:27017/resources?authSource=resources"
)

Write-Host "🔍 Verificação do Banco MongoDB - Resources API" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Verificar se mongosh está instalado
$mongoshPath = Get-Command mongosh -ErrorAction SilentlyContinue
if (-not $mongoshPath) {
    Write-Host "❌ Erro: mongosh não está instalado ou não está no PATH" -ForegroundColor Red
    Write-Host "   Instale o MongoDB Shell: https://www.mongodb.com/try/download/shell" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Alternativa: Use a API para verificar os dados:" -ForegroundColor Cyan
    Write-Host "   Invoke-RestMethod -Uri 'http://localhost:8187/api/v1/categories'" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ mongosh encontrado" -ForegroundColor Green
Write-Host "🔗 MongoDB URI: $MongoUri" -ForegroundColor Cyan
Write-Host ""

# Script para verificação
$verifyScript = @"
db = db.getSiblingDB('resources');

print('📊 Resumo do Banco de Dados\n');
print('='.repeat(50));

const categoriesCount = db.categories.countDocuments();
const featuresCount = db.features.countDocuments();
const resourcesCount = db.resources.countDocuments();
const featureValuesCount = db.feature_values.countDocuments();

print('\n📈 Contadores:');
print('   Categorias:      ' + categoriesCount);
print('   Features:        ' + featuresCount);
print('   Resources:       ' + resourcesCount);
print('   Feature Values:  ' + featureValuesCount);

if (categoriesCount === 0) {
    print('\n⚠️  AVISO: Banco vazio! Execute o seed primeiro.');
    print('   npm run seed:mongo');
} else {
    print('\n✅ Banco populado com sucesso!');
}

print('\n📁 Categorias:');
db.categories.find({}, {name: 1, _id: 0}).forEach(cat => {
    print('   • ' + cat.name);
});

print('\n📦 Resources por Categoria:');
db.categories.find({}).forEach(cat => {
    const count = db.resources.countDocuments({categoryId: cat._id});
    print('   • ' + cat.name + ': ' + count + ' resources');
});

print('\n🔧 Features por Categoria:');
db.categories.find({}).forEach(cat => {
    const features = db.features.find({categoryId: cat._id}, {name: 1, type: 1, _id: 0}).toArray();
    print('   • ' + cat.name + ':');
    features.forEach(f => {
        print('      - ' + f.name + ' (' + f.type + ')');
    });
});

print('\n📊 Resources (primeiros 5):');
db.resources.find({}).limit(5).forEach(res => {
    const category = db.categories.findOne({_id: res.categoryId});
    const categoryName = category ? category.name : 'N/A';
    const statusIcon = res.status ? '✅' : '❌';
    print('   ' + statusIcon + ' ' + res.name + ' (' + res.quantity + ' unidades) - ' + categoryName);
});

if (resourcesCount > 5) {
    print('   ... e mais ' + (resourcesCount - 5) + ' resources');
}

print('\n='.repeat(50));
"@

# Executar verificação
try {
    $verifyScript | mongosh $MongoUri --quiet
    
    Write-Host ""
    Write-Host "💡 Para ver todos os dados:" -ForegroundColor Cyan
    Write-Host "   mongosh '$MongoUri'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "💡 Ou use a API:" -ForegroundColor Cyan
    Write-Host "   Invoke-RestMethod -Uri 'http://localhost:8187/api/v1/categories'" -ForegroundColor Gray
    Write-Host "   Invoke-RestMethod -Uri 'http://localhost:8187/api/v1/resources'" -ForegroundColor Gray
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "❌ Erro ao conectar ao MongoDB: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Verifique:" -ForegroundColor Yellow
    Write-Host "   1. MongoDB está rodando? docker-compose ps mongodb" -ForegroundColor Gray
    Write-Host "   2. URI de conexão está correta?" -ForegroundColor Gray
    Write-Host "   3. Credenciais estão corretas?" -ForegroundColor Gray
    Write-Host ""
    exit 1
}
