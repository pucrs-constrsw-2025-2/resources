/**
 * MongoDB Direct Seed Script
 * 
 * Este script conecta diretamente ao MongoDB usando o driver nativo
 * e popula o banco com dados iniciais.
 * 
 * Uso:
 *   npm run seed:mongo
 * 
 * Ou diretamente:
 *   npx ts-node -r tsconfig-paths/register src/scripts/seed-mongodb.ts
 */

import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

// Configuração do MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://resources:a12345678@localhost:27017/resources?authSource=resources';
const DB_NAME = 'resources';

interface SeedData {
  categories: Array<{ name: string }>;
  features: Array<{ name: string; type: string; categoryName: string }>;
  resources: Array<{
    name: string;
    quantity: number;
    status: boolean;
    categoryName: string;
    featureValues: Record<string, string | number | boolean>;
  }>;
}

async function seedMongoDB() {
  try {
    console.log('🔌 Conectando ao MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado ao MongoDB');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }

    // Carregar dados do arquivo JSON
    const dataPath = path.join(__dirname, 'seed-data.json');
    const seedData: SeedData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    console.log('🌱 Iniciando seed do banco MongoDB...');

    // Opcional: Limpar collections existentes
    const shouldClean = process.env.CLEAN_DB === 'true';
    if (shouldClean) {
      console.log('🧹 Limpando collections existentes...');
      await db.collection('categories').deleteMany({});
      await db.collection('features').deleteMany({});
      await db.collection('resources').deleteMany({});
      await db.collection('feature_values').deleteMany({});
      console.log('✅ Collections limpas');
    }

    // 1. Criar categorias
    console.log('📁 Criando categorias...');
    const categoriesCollection = db.collection('categories');
    const categoryMap = new Map<string, mongoose.Types.ObjectId>();

    for (const category of seedData.categories) {
      const result = await categoriesCollection.insertOne({
        name: category.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      categoryMap.set(category.name, result.insertedId as mongoose.Types.ObjectId);
      console.log(`   ✓ ${category.name}`);
    }
    console.log(`✅ ${categoryMap.size} categorias criadas`);

    // 2. Criar features
    console.log('🔧 Criando features...');
    const featuresCollection = db.collection('features');
    const featureMap = new Map<string, { id: mongoose.Types.ObjectId; categoryId: mongoose.Types.ObjectId }>();

    for (const feature of seedData.features) {
      const categoryId = categoryMap.get(feature.categoryName);
      if (!categoryId) {
        console.warn(`   ⚠️  Categoria não encontrada: ${feature.categoryName}`);
        continue;
      }

      const result = await featuresCollection.insertOne({
        name: feature.name,
        type: feature.type,
        categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      featureMap.set(`${feature.categoryName}:${feature.name}`, {
        id: result.insertedId as mongoose.Types.ObjectId,
        categoryId,
      });
      console.log(`   ✓ ${feature.name} (${feature.categoryName})`);
    }
    console.log(`✅ ${featureMap.size} features criadas`);

    // 3. Criar resources e feature values
    console.log('📦 Criando resources...');
    const resourcesCollection = db.collection('resources');
    const featureValuesCollection = db.collection('feature_values');

    let resourceCount = 0;
    let featureValueCount = 0;

    for (const resource of seedData.resources) {
      const categoryId = categoryMap.get(resource.categoryName);
      if (!categoryId) {
        console.warn(`   ⚠️  Categoria não encontrada: ${resource.categoryName}`);
        continue;
      }

      // Criar resource
      const resourceResult = await resourcesCollection.insertOne({
        name: resource.name,
        quantity: resource.quantity,
        status: resource.status,
        categoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      resourceCount++;
      console.log(`   ✓ ${resource.name}`);

      // Criar feature values
      for (const [featureName, value] of Object.entries(resource.featureValues)) {
        const featureKey = `${resource.categoryName}:${featureName}`;
        const feature = featureMap.get(featureKey);

        if (!feature) {
          console.warn(`     ⚠️  Feature não encontrada: ${featureName}`);
          continue;
        }

        const featureValue: any = {
          resourceId: resourceResult.insertedId,
          featureId: feature.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Determinar tipo de valor
        if (typeof value === 'string') {
          featureValue.valueString = value;
        } else if (typeof value === 'number') {
          featureValue.valueNumber = value;
        } else if (typeof value === 'boolean') {
          featureValue.valueBoolean = value;
        }

        await featureValuesCollection.insertOne(featureValue);
        featureValueCount++;
      }
    }
    console.log(`✅ ${resourceCount} resources criados`);
    console.log(`💎 ${featureValueCount} feature values criados`);

    // Resumo final
    const categoriesCount = await categoriesCollection.countDocuments();
    const featuresCount = await featuresCollection.countDocuments();
    const resourcesCount = await resourcesCollection.countDocuments();
    const featureValuesCount = await featureValuesCollection.countDocuments();

    console.log('\n🎉 Seed concluído com sucesso!');
    console.log('\n📊 Resumo:');
    console.log(`   Categorias: ${categoriesCount}`);
    console.log(`   Features: ${featuresCount}`);
    console.log(`   Resources: ${resourcesCount}`);
    console.log(`   Feature Values: ${featureValuesCount}`);

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Conexão com MongoDB fechada');
  }
}

// Executar seed
seedMongoDB();
