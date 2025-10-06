import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CategoryService } from '../services/category.service';
import { FeatureService } from '../services/feature.service';
import { ResourceService } from '../services/resource.service';
import { FeatureValueService } from '../services/feature-value.service';
import { ValueType } from '../enums/value-type.enum';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const categoryService = app.get(CategoryService);
  const featureService = app.get(FeatureService);
  const resourceService = app.get(ResourceService);
  const featureValueService = app.get(FeatureValueService);

  try {
    console.log('🌱 Starting database seeding...');

    // Create categories
    const electronicsCategory = await categoryService.create({
      name: 'Eletrônicos',
    });

    const furnitureCategory = await categoryService.create({
      name: 'Móveis',
    });

    console.log('✅ Categories created');

    // Create features for electronics
    const screenSizeFeature = await featureService.create({
      name: 'Tamanho da Tela',
      type: ValueType.STRING,
      categoryId: electronicsCategory.id,
    });

    const priceFeature = await featureService.create({
      name: 'Preço',
      type: ValueType.NUMBER,
      categoryId: electronicsCategory.id,
    });

    const wirelessFeature = await featureService.create({
      name: 'Sem Fio',
      type: ValueType.BOOLEAN,
      categoryId: electronicsCategory.id,
    });

    // Create features for furniture
    const materialFeature = await featureService.create({
      name: 'Material',
      type: ValueType.STRING,
      categoryId: furnitureCategory.id,
    });

    const weightFeature = await featureService.create({
      name: 'Peso (kg)',
      type: ValueType.NUMBER,
      categoryId: furnitureCategory.id,
    });

    console.log('✅ Features created');

    // Create resources
    const iphone = await resourceService.create({
      name: 'iPhone 14',
      quantity: 15,
      status: true,
      categoryId: electronicsCategory.id,
    });

    const samsung = await resourceService.create({
      name: 'Samsung Galaxy S23',
      quantity: 8,
      status: true,
      categoryId: electronicsCategory.id,
    });

    const airpods = await resourceService.create({
      name: 'AirPods Pro',
      quantity: 25,
      status: true,
      categoryId: electronicsCategory.id,
    });

    const chair = await resourceService.create({
      name: 'Cadeira de Escritório',
      quantity: 12,
      status: true,
      categoryId: furnitureCategory.id,
    });

    const desk = await resourceService.create({
      name: 'Mesa de Computador',
      quantity: 5,
      status: false,
      categoryId: furnitureCategory.id,
    });

    console.log('✅ Resources created');

    // Create feature values for iPhone
    await featureValueService.create({
      valueString: '6.1 polegadas',
      resourceId: iphone.id,
      featureId: screenSizeFeature.id,
    });

    await featureValueService.create({
      valueNumber: 4999.99,
      resourceId: iphone.id,
      featureId: priceFeature.id,
    });

    await featureValueService.create({
      valueBoolean: true,
      resourceId: iphone.id,
      featureId: wirelessFeature.id,
    });

    // Create feature values for Samsung
    await featureValueService.create({
      valueString: '6.1 polegadas',
      resourceId: samsung.id,
      featureId: screenSizeFeature.id,
    });

    await featureValueService.create({
      valueNumber: 3999.99,
      resourceId: samsung.id,
      featureId: priceFeature.id,
    });

    await featureValueService.create({
      valueBoolean: true,
      resourceId: samsung.id,
      featureId: wirelessFeature.id,
    });

    // Create feature values for AirPods
    await featureValueService.create({
      valueString: 'N/A',
      resourceId: airpods.id,
      featureId: screenSizeFeature.id,
    });

    await featureValueService.create({
      valueNumber: 1299.99,
      resourceId: airpods.id,
      featureId: priceFeature.id,
    });

    await featureValueService.create({
      valueBoolean: true,
      resourceId: airpods.id,
      featureId: wirelessFeature.id,
    });

    // Create feature values for Chair
    await featureValueService.create({
      valueString: 'Couro sintético',
      resourceId: chair.id,
      featureId: materialFeature.id,
    });

    await featureValueService.create({
      valueNumber: 15.5,
      resourceId: chair.id,
      featureId: weightFeature.id,
    });

    // Create feature values for Desk
    await featureValueService.create({
      valueString: 'Madeira MDF',
      resourceId: desk.id,
      featureId: materialFeature.id,
    });

    await featureValueService.create({
      valueNumber: 32.0,
      resourceId: desk.id,
      featureId: weightFeature.id,
    });

    console.log('✅ Feature values created');
    console.log('🎉 Database seeding completed successfully!');

    // Display summary
    const categories = await categoryService.findAll();
    const features = await featureService.findAll();
    const resources = await resourceService.findAll();
    const featureValues = await featureValueService.findAll();

    console.log('\n📊 Summary:');
    console.log(`Categories: ${categories.length}`);
    console.log(`Features: ${features.length}`);
    console.log(`Resources: ${resources.length}`);
    console.log(`Feature Values: ${featureValues.length}`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await app.close();
  }
}

seed();