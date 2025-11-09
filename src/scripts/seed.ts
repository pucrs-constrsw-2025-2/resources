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
    const audiovisualCategory = await categoryService.create({
      name: 'Equipamentos Audiovisuais',
    });

    const computingCategory = await categoryService.create({
      name: 'Equipamentos de Informática',
    });

    const laboratoryCategory = await categoryService.create({
      name: 'Equipamentos de Laboratório',
    });

    console.log('✅ Categories created');

    // Create features for audiovisual equipment
    const resolutionFeature = await featureService.create({
      name: 'Resolução',
      type: ValueType.STRING,
      categoryId: (audiovisualCategory as any)._id,
    });

    const connectivityFeature = await featureService.create({
      name: 'Conectividade',
      type: ValueType.STRING,
      categoryId: (audiovisualCategory as any)._id,
    });

    const portableFeature = await featureService.create({
      name: 'Portátil',
      type: ValueType.BOOLEAN,
      categoryId: (audiovisualCategory as any)._id,
    });

    // Create features for computing equipment
    const processorFeature = await featureService.create({
      name: 'Processador',
      type: ValueType.STRING,
      categoryId: (computingCategory as any)._id,
    });

    const ramFeature = await featureService.create({
      name: 'Memória RAM',
      type: ValueType.STRING,
      categoryId: (computingCategory as any)._id,
    });

    const storageFeature = await featureService.create({
      name: 'Armazenamento',
      type: ValueType.STRING,
      categoryId: (computingCategory as any)._id,
    });

    // Create features for laboratory equipment
    const capacityFeature = await featureService.create({
      name: 'Capacidade',
      type: ValueType.STRING,
      categoryId: (laboratoryCategory as any)._id,
    });

    const voltageFeature = await featureService.create({
      name: 'Voltagem',
      type: ValueType.STRING,
      categoryId: (laboratoryCategory as any)._id,
    });

    const calibrationFeature = await featureService.create({
      name: 'Calibrado',
      type: ValueType.BOOLEAN,
      categoryId: (laboratoryCategory as any)._id,
    });

    console.log('✅ Features created');

    // Create audiovisual resources
    const projector = await resourceService.create({
      name: 'Projetor Epson PowerLite',
      quantity: 12,
      status: true,
      categoryId: (audiovisualCategory as any)._id,
    });

    const microphone = await resourceService.create({
      name: 'Microfone sem fio Shure',
      quantity: 8,
      status: true,
      categoryId: (audiovisualCategory as any)._id,
    });

    const speaker = await resourceService.create({
      name: 'Caixa de Som Amplificada',
      quantity: 6,
      status: true,
      categoryId: (audiovisualCategory as any)._id,
    });

    const videoCamera = await resourceService.create({
      name: 'Câmera de Vídeo Sony 4K',
      quantity: 4,
      status: true,
      categoryId: (audiovisualCategory as any)._id,
    });

    // Create computing resources
    const laptop = await resourceService.create({
      name: 'Notebook Dell Inspiron',
      quantity: 20,
      status: true,
      categoryId: (computingCategory as any)._id,
    });

    const tablet = await resourceService.create({
      name: 'Tablet Samsung Galaxy Tab',
      quantity: 15,
      status: true,
      categoryId: (computingCategory as any)._id,
    });

    const adapter = await resourceService.create({
      name: 'Adaptador HDMI/VGA',
      quantity: 25,
      status: true,
      categoryId: (computingCategory as any)._id,
    });

    // Create laboratory resources
    const oscilloscope = await resourceService.create({
      name: 'Osciloscópio Digital',
      quantity: 5,
      status: true,
      categoryId: (laboratoryCategory as any)._id,
    });

    const multimeter = await resourceService.create({
      name: 'Multímetro Digital Fluke',
      quantity: 10,
      status: true,
      categoryId: (laboratoryCategory as any)._id,
    });

    const powerSupply = await resourceService.create({
      name: 'Fonte de Alimentação DC',
      quantity: 8,
      status: false,
      categoryId: (laboratoryCategory as any)._id,
    });

    console.log('✅ Resources created');

    // Create feature values for Projector
    await featureValueService.create({
      valueString: '1920x1080 Full HD',
      resourceId: (projector as any)._id,
      featureId: (resolutionFeature as any)._id,
    });

    await featureValueService.create({
      valueString: 'HDMI, VGA, USB',
      resourceId: (projector as any)._id,
      featureId: (connectivityFeature as any)._id,
    });

    await featureValueService.create({
      valueBoolean: true,
      resourceId: (projector as any)._id,
      featureId: (portableFeature as any)._id,
    });

    // Create feature values for Microphone
    await featureValueService.create({
      valueString: 'N/A',
      resourceId: (microphone as any)._id,
      featureId: (resolutionFeature as any)._id,
    });

    await featureValueService.create({
      valueString: 'Wireless 2.4GHz',
      resourceId: (microphone as any)._id,
      featureId: (connectivityFeature as any)._id,
    });

    await featureValueService.create({
      valueBoolean: true,
      resourceId: (microphone as any)._id,
      featureId: (portableFeature as any)._id,
    });

    // Create feature values for Speaker
    await featureValueService.create({
      valueString: 'N/A',
      resourceId: (speaker as any)._id,
      featureId: (resolutionFeature as any)._id,
    });

    await featureValueService.create({
      valueString: 'Bluetooth, Auxiliar, USB',
      resourceId: (speaker as any)._id,
      featureId: (connectivityFeature as any)._id,
    });

    await featureValueService.create({
      valueBoolean: true,
      resourceId: (speaker as any)._id,
      featureId: (portableFeature as any)._id,
    });

    // Create feature values for Video Camera
    await featureValueService.create({
      valueString: '3840x2160 4K UHD',
      resourceId: (videoCamera as any)._id,
      featureId: (resolutionFeature as any)._id,
    });

    await featureValueService.create({
      valueString: 'HDMI, USB-C, Wi-Fi',
      resourceId: (videoCamera as any)._id,
      featureId: (connectivityFeature as any)._id,
    });

    await featureValueService.create({
      valueBoolean: true,
      resourceId: (videoCamera as any)._id,
      featureId: (portableFeature as any)._id,
    });

    // Create feature values for Laptop
    await featureValueService.create({
      valueString: 'Intel Core i5 11ª geração',
      resourceId: (laptop as any)._id,
      featureId: (processorFeature as any)._id,
    });

    await featureValueService.create({
      valueString: '8GB DDR4',
      resourceId: (laptop as any)._id,
      featureId: (ramFeature as any)._id,
    });

    await featureValueService.create({
      valueString: '256GB SSD',
      resourceId: (laptop as any)._id,
      featureId: (storageFeature as any)._id,
    });

    // Create feature values for Tablet
    await featureValueService.create({
      valueString: 'Snapdragon 865',
      resourceId: (tablet as any)._id,
      featureId: (processorFeature as any)._id,
    });

    await featureValueService.create({
      valueString: '6GB',
      resourceId: (tablet as any)._id,
      featureId: (ramFeature as any)._id,
    });

    await featureValueService.create({
      valueString: '128GB',
      resourceId: (tablet as any)._id,
      featureId: (storageFeature as any)._id,
    });

    // Create feature values for Adapter
    await featureValueService.create({
      valueString: 'N/A',
      resourceId: (adapter as any)._id,
      featureId: (processorFeature as any)._id,
    });

    await featureValueService.create({
      valueString: 'N/A',
      resourceId: (adapter as any)._id,
      featureId: (ramFeature as any)._id,
    });

    await featureValueService.create({
      valueString: 'N/A',
      resourceId: (adapter as any)._id,
      featureId: (storageFeature as any)._id,
    });

    // Create feature values for Oscilloscope
    await featureValueService.create({
      valueString: '100 MHz, 4 canais',
      resourceId: (oscilloscope as any)._id,
      featureId: (capacityFeature as any)._id,
    });

    await featureValueService.create({
      valueString: '110V/220V',
      resourceId: (oscilloscope as any)._id,
      featureId: (voltageFeature as any)._id,
    });

    await featureValueService.create({
      valueBoolean: true,
      resourceId: (oscilloscope as any)._id,
      featureId: (calibrationFeature as any)._id,
    });

    // Create feature values for Multimeter
    await featureValueService.create({
      valueString: '1000V, 10A',
      resourceId: (multimeter as any)._id,
      featureId: (capacityFeature as any)._id,
    });

    await featureValueService.create({
      valueString: 'Bateria 9V',
      resourceId: (multimeter as any)._id,
      featureId: (voltageFeature as any)._id,
    });

    await featureValueService.create({
      valueBoolean: true,
      resourceId: (multimeter as any)._id,
      featureId: (calibrationFeature as any)._id,
    });

    // Create feature values for Power Supply
    await featureValueService.create({
      valueString: '0-30V, 0-5A',
      resourceId: (powerSupply as any)._id,
      featureId: (capacityFeature as any)._id,
    });

    await featureValueService.create({
      valueString: '110V/220V',
      resourceId: (powerSupply as any)._id,
      featureId: (voltageFeature as any)._id,
    });

    await featureValueService.create({
      valueBoolean: false,
      resourceId: (powerSupply as any)._id,
      featureId: (calibrationFeature as any)._id,
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