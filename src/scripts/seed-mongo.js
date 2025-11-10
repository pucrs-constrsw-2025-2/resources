/**
 * MongoDB Shell Seed Script
 * 
 * Execute este script para popular o banco MongoDB com dados iniciais.
 * 
 * Uso:
 *   mongosh mongodb://resources:a12345678@localhost:27017/resources?authSource=resources < seed-mongo.js
 * 
 * Ou dentro do mongosh:
 *   use resources
 *   load('seed-mongo.js')
 */

// Conectar ao banco de dados
db = db.getSiblingDB('resources');

print('🌱 Iniciando seed do banco MongoDB...');

// Limpar collections existentes (opcional - descomente se quiser limpar antes)
// db.categories.deleteMany({});
// db.features.deleteMany({});
// db.resources.deleteMany({});
// db.feature_values.deleteMany({});
// print('✅ Collections limpas');

// Criar categories
print('📁 Criando categorias...');
const categoryAudiovisual = db.categories.insertOne({
  name: 'Equipamentos Audiovisuais',
  createdAt: new Date(),
  updatedAt: new Date()
});

const categoryInformatica = db.categories.insertOne({
  name: 'Equipamentos de Informática',
  createdAt: new Date(),
  updatedAt: new Date()
});

const categoryLaboratorio = db.categories.insertOne({
  name: 'Equipamentos de Laboratório',
  createdAt: new Date(),
  updatedAt: new Date()
});

const audiovisualId = categoryAudiovisual.insertedId;
const informaticaId = categoryInformatica.insertedId;
const laboratorioId = categoryLaboratorio.insertedId;

print(`✅ ${db.categories.countDocuments()} categorias criadas`);

// Criar features
print('🔧 Criando features...');

// Features para Audiovisual
const featureResolucao = db.features.insertOne({
  name: 'Resolução',
  type: 'STRING',
  categoryId: audiovisualId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const featureConectividade = db.features.insertOne({
  name: 'Conectividade',
  type: 'STRING',
  categoryId: audiovisualId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const featurePortatil = db.features.insertOne({
  name: 'Portátil',
  type: 'BOOLEAN',
  categoryId: audiovisualId,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Features para Informática
const featureProcessador = db.features.insertOne({
  name: 'Processador',
  type: 'STRING',
  categoryId: informaticaId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const featureRam = db.features.insertOne({
  name: 'Memória RAM',
  type: 'STRING',
  categoryId: informaticaId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const featureArmazenamento = db.features.insertOne({
  name: 'Armazenamento',
  type: 'STRING',
  categoryId: informaticaId,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Features para Laboratório
const featureCapacidade = db.features.insertOne({
  name: 'Capacidade',
  type: 'STRING',
  categoryId: laboratorioId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const featureVoltagem = db.features.insertOne({
  name: 'Voltagem',
  type: 'STRING',
  categoryId: laboratorioId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const featureCalibrado = db.features.insertOne({
  name: 'Calibrado',
  type: 'BOOLEAN',
  categoryId: laboratorioId,
  createdAt: new Date(),
  updatedAt: new Date()
});

print(`✅ ${db.features.countDocuments()} features criadas`);

// Criar resources
print('📦 Criando resources...');

// Resources Audiovisuais
const resourceProjetor = db.resources.insertOne({
  name: 'Projetor Epson PowerLite',
  quantity: 12,
  status: true,
  categoryId: audiovisualId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const resourceMicrofone = db.resources.insertOne({
  name: 'Microfone sem fio Shure',
  quantity: 8,
  status: true,
  categoryId: audiovisualId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const resourceCaixaSom = db.resources.insertOne({
  name: 'Caixa de Som Amplificada',
  quantity: 6,
  status: true,
  categoryId: audiovisualId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const resourceCamera = db.resources.insertOne({
  name: 'Câmera de Vídeo Sony 4K',
  quantity: 4,
  status: true,
  categoryId: audiovisualId,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Resources Informática
const resourceNotebook = db.resources.insertOne({
  name: 'Notebook Dell Inspiron',
  quantity: 20,
  status: true,
  categoryId: informaticaId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const resourceTablet = db.resources.insertOne({
  name: 'Tablet Samsung Galaxy Tab',
  quantity: 15,
  status: true,
  categoryId: informaticaId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const resourceAdaptador = db.resources.insertOne({
  name: 'Adaptador HDMI/VGA',
  quantity: 25,
  status: true,
  categoryId: informaticaId,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Resources Laboratório
const resourceOsciloscopio = db.resources.insertOne({
  name: 'Osciloscópio Digital',
  quantity: 5,
  status: true,
  categoryId: laboratorioId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const resourceMultimetro = db.resources.insertOne({
  name: 'Multímetro Digital Fluke',
  quantity: 10,
  status: true,
  categoryId: laboratorioId,
  createdAt: new Date(),
  updatedAt: new Date()
});

const resourceFonte = db.resources.insertOne({
  name: 'Fonte de Alimentação DC',
  quantity: 8,
  status: false,
  categoryId: laboratorioId,
  createdAt: new Date(),
  updatedAt: new Date()
});

print(`✅ ${db.resources.countDocuments()} resources criados`);

// Criar feature values
print('💎 Criando feature values...');

const featureValues = [
  // Projetor
  { valueString: '1920x1080 Full HD', resourceId: resourceProjetor.insertedId, featureId: featureResolucao.insertedId },
  { valueString: 'HDMI, VGA, USB', resourceId: resourceProjetor.insertedId, featureId: featureConectividade.insertedId },
  { valueBoolean: true, resourceId: resourceProjetor.insertedId, featureId: featurePortatil.insertedId },
  
  // Microfone
  { valueString: 'N/A', resourceId: resourceMicrofone.insertedId, featureId: featureResolucao.insertedId },
  { valueString: 'Wireless 2.4GHz', resourceId: resourceMicrofone.insertedId, featureId: featureConectividade.insertedId },
  { valueBoolean: true, resourceId: resourceMicrofone.insertedId, featureId: featurePortatil.insertedId },
  
  // Caixa de Som
  { valueString: 'N/A', resourceId: resourceCaixaSom.insertedId, featureId: featureResolucao.insertedId },
  { valueString: 'Bluetooth, Auxiliar, USB', resourceId: resourceCaixaSom.insertedId, featureId: featureConectividade.insertedId },
  { valueBoolean: true, resourceId: resourceCaixaSom.insertedId, featureId: featurePortatil.insertedId },
  
  // Câmera
  { valueString: '3840x2160 4K UHD', resourceId: resourceCamera.insertedId, featureId: featureResolucao.insertedId },
  { valueString: 'HDMI, USB-C, Wi-Fi', resourceId: resourceCamera.insertedId, featureId: featureConectividade.insertedId },
  { valueBoolean: true, resourceId: resourceCamera.insertedId, featureId: featurePortatil.insertedId },
  
  // Notebook
  { valueString: 'Intel Core i5 11ª geração', resourceId: resourceNotebook.insertedId, featureId: featureProcessador.insertedId },
  { valueString: '8GB DDR4', resourceId: resourceNotebook.insertedId, featureId: featureRam.insertedId },
  { valueString: '256GB SSD', resourceId: resourceNotebook.insertedId, featureId: featureArmazenamento.insertedId },
  
  // Tablet
  { valueString: 'Snapdragon 865', resourceId: resourceTablet.insertedId, featureId: featureProcessador.insertedId },
  { valueString: '6GB', resourceId: resourceTablet.insertedId, featureId: featureRam.insertedId },
  { valueString: '128GB', resourceId: resourceTablet.insertedId, featureId: featureArmazenamento.insertedId },
  
  // Adaptador
  { valueString: 'N/A', resourceId: resourceAdaptador.insertedId, featureId: featureProcessador.insertedId },
  { valueString: 'N/A', resourceId: resourceAdaptador.insertedId, featureId: featureRam.insertedId },
  { valueString: 'N/A', resourceId: resourceAdaptador.insertedId, featureId: featureArmazenamento.insertedId },
  
  // Osciloscópio
  { valueString: '100 MHz, 4 canais', resourceId: resourceOsciloscopio.insertedId, featureId: featureCapacidade.insertedId },
  { valueString: '110V/220V', resourceId: resourceOsciloscopio.insertedId, featureId: featureVoltagem.insertedId },
  { valueBoolean: true, resourceId: resourceOsciloscopio.insertedId, featureId: featureCalibrado.insertedId },
  
  // Multímetro
  { valueString: '1000V, 10A', resourceId: resourceMultimetro.insertedId, featureId: featureCapacidade.insertedId },
  { valueString: 'Bateria 9V', resourceId: resourceMultimetro.insertedId, featureId: featureVoltagem.insertedId },
  { valueBoolean: true, resourceId: resourceMultimetro.insertedId, featureId: featureCalibrado.insertedId },
  
  // Fonte de Alimentação
  { valueString: '0-30V, 0-5A', resourceId: resourceFonte.insertedId, featureId: featureCapacidade.insertedId },
  { valueString: '110V/220V', resourceId: resourceFonte.insertedId, featureId: featureVoltagem.insertedId },
  { valueBoolean: false, resourceId: resourceFonte.insertedId, featureId: featureCalibrado.insertedId }
];

featureValues.forEach(fv => {
  fv.createdAt = new Date();
  fv.updatedAt = new Date();
});

db.feature_values.insertMany(featureValues);

print(`✅ ${db.feature_values.countDocuments()} feature values criados`);

// Resumo final
print('\n🎉 Seed concluído com sucesso!');
print('\n📊 Resumo:');
print(`   Categorias: ${db.categories.countDocuments()}`);
print(`   Features: ${db.features.countDocuments()}`);
print(`   Resources: ${db.resources.countDocuments()}`);
print(`   Feature Values: ${db.feature_values.countDocuments()}`);
