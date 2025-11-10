/**
 * Auto Seed Service
 * 
 * Serviço que verifica se o banco MongoDB está vazio e executa o seed automaticamente
 * na inicialização da aplicação se necessário.
 */

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../entities/category.entity';
import { Feature, FeatureDocument } from '../entities/feature.entity';
import { Resource, ResourceDocument } from '../entities/resource.entity';
import { FeatureValue, FeatureValueDocument } from '../entities/feature-value.entity';
import { CategoryService } from './category.service';
import { FeatureService } from './feature.service';
import { ResourceService } from './resource.service';
import { FeatureValueService } from './feature-value.service';
import { ValueType } from '../enums/value-type.enum';

@Injectable()
export class AutoSeedService implements OnModuleInit {
  private readonly logger = new Logger(AutoSeedService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Feature.name) private featureModel: Model<FeatureDocument>,
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>,
    @InjectModel(FeatureValue.name) private featureValueModel: Model<FeatureValueDocument>,
    private readonly categoryService: CategoryService,
    private readonly featureService: FeatureService,
    private readonly resourceService: ResourceService,
    private readonly featureValueService: FeatureValueService,
  ) {}

  async onModuleInit() {
    const autoSeedEnabled = process.env.AUTO_SEED === 'true';
    
    if (!autoSeedEnabled) {
      this.logger.log('Auto-seed desabilitado (AUTO_SEED !== true)');
      return;
    }

    try {
      await this.checkAndSeed();
    } catch (error) {
      this.logger.error('Erro durante auto-seed:', error);
      // Não fazer throw para não impedir a inicialização da aplicação
    }
  }

  private async checkAndSeed() {
    this.logger.log('🔍 Verificando se o banco precisa ser populado...');

    // Verificar se já existem dados
    const categoriesCount = await this.categoryModel.countDocuments();
    const resourcesCount = await this.resourceModel.countDocuments();

    if (categoriesCount > 0 || resourcesCount > 0) {
      this.logger.log('✅ Banco já contém dados. Auto-seed não será executado.');
      this.logger.log(`📊 Dados existentes: ${categoriesCount} categorias, ${resourcesCount} resources`);
      return;
    }

    this.logger.log('🌱 Banco vazio detectado. Iniciando auto-seed...');
    await this.executeSeed();
  }

  private async executeSeed() {
    try {
      // Create categories
      const audiovisualCategory = await this.categoryService.create({
        name: 'Equipamentos Audiovisuais',
      });

      const computingCategory = await this.categoryService.create({
        name: 'Equipamentos de Informática',
      });

      const laboratoryCategory = await this.categoryService.create({
        name: 'Equipamentos de Laboratório',
      });

      this.logger.log('✅ Categorias criadas');

      // Create features for audiovisual equipment
      const resolutionFeature = await this.featureService.create({
        name: 'Resolução',
        type: ValueType.STRING,
        categoryId: (audiovisualCategory as any)._id,
      });

      const connectivityFeature = await this.featureService.create({
        name: 'Conectividade',
        type: ValueType.STRING,
        categoryId: (audiovisualCategory as any)._id,
      });

      const portableFeature = await this.featureService.create({
        name: 'Portátil',
        type: ValueType.BOOLEAN,
        categoryId: (audiovisualCategory as any)._id,
      });

      // Create features for computing equipment
      const processorFeature = await this.featureService.create({
        name: 'Processador',
        type: ValueType.STRING,
        categoryId: (computingCategory as any)._id,
      });

      const ramFeature = await this.featureService.create({
        name: 'Memória RAM',
        type: ValueType.STRING,
        categoryId: (computingCategory as any)._id,
      });

      const storageFeature = await this.featureService.create({
        name: 'Armazenamento',
        type: ValueType.STRING,
        categoryId: (computingCategory as any)._id,
      });

      // Create features for laboratory equipment
      const capacityFeature = await this.featureService.create({
        name: 'Capacidade',
        type: ValueType.STRING,
        categoryId: (laboratoryCategory as any)._id,
      });

      const voltageFeature = await this.featureService.create({
        name: 'Voltagem',
        type: ValueType.STRING,
        categoryId: (laboratoryCategory as any)._id,
      });

      const calibrationFeature = await this.featureService.create({
        name: 'Calibrado',
        type: ValueType.BOOLEAN,
        categoryId: (laboratoryCategory as any)._id,
      });

      this.logger.log('✅ Features criadas');

      // Create audiovisual resources
      const projector = await this.resourceService.create({
        name: 'Projetor Epson PowerLite',
        quantity: 12,
        status: true,
        categoryId: (audiovisualCategory as any)._id,
      });

      const microphone = await this.resourceService.create({
        name: 'Microfone sem fio Shure',
        quantity: 8,
        status: true,
        categoryId: (audiovisualCategory as any)._id,
      });

      const speaker = await this.resourceService.create({
        name: 'Caixa de Som Amplificada',
        quantity: 6,
        status: true,
        categoryId: (audiovisualCategory as any)._id,
      });

      const videoCamera = await this.resourceService.create({
        name: 'Câmera de Vídeo Sony 4K',
        quantity: 4,
        status: true,
        categoryId: (audiovisualCategory as any)._id,
      });

      // Create computing resources
      const laptop = await this.resourceService.create({
        name: 'Notebook Dell Inspiron',
        quantity: 20,
        status: true,
        categoryId: (computingCategory as any)._id,
      });

      const tablet = await this.resourceService.create({
        name: 'Tablet Samsung Galaxy Tab',
        quantity: 15,
        status: true,
        categoryId: (computingCategory as any)._id,
      });

      const adapter = await this.resourceService.create({
        name: 'Adaptador HDMI/VGA',
        quantity: 25,
        status: true,
        categoryId: (computingCategory as any)._id,
      });

      // Create laboratory resources
      const oscilloscope = await this.resourceService.create({
        name: 'Osciloscópio Digital',
        quantity: 5,
        status: true,
        categoryId: (laboratoryCategory as any)._id,
      });

      const multimeter = await this.resourceService.create({
        name: 'Multímetro Digital Fluke',
        quantity: 10,
        status: true,
        categoryId: (laboratoryCategory as any)._id,
      });

      const powerSupply = await this.resourceService.create({
        name: 'Fonte de Alimentação DC',
        quantity: 8,
        status: false,
        categoryId: (laboratoryCategory as any)._id,
      });

      this.logger.log('✅ Resources criados');

      // Create feature values for Projector
      await this.featureValueService.create({
        valueString: '1920x1080 Full HD',
        resourceId: (projector as any)._id,
        featureId: (resolutionFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: 'HDMI, VGA, USB',
        resourceId: (projector as any)._id,
        featureId: (connectivityFeature as any)._id,
      });

      await this.featureValueService.create({
        valueBoolean: true,
        resourceId: (projector as any)._id,
        featureId: (portableFeature as any)._id,
      });

      // Create feature values for Microphone
      await this.featureValueService.create({
        valueString: 'N/A',
        resourceId: (microphone as any)._id,
        featureId: (resolutionFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: 'Wireless 2.4GHz',
        resourceId: (microphone as any)._id,
        featureId: (connectivityFeature as any)._id,
      });

      await this.featureValueService.create({
        valueBoolean: true,
        resourceId: (microphone as any)._id,
        featureId: (portableFeature as any)._id,
      });

      // Create feature values for Speaker
      await this.featureValueService.create({
        valueString: 'N/A',
        resourceId: (speaker as any)._id,
        featureId: (resolutionFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: 'Bluetooth, Auxiliar, USB',
        resourceId: (speaker as any)._id,
        featureId: (connectivityFeature as any)._id,
      });

      await this.featureValueService.create({
        valueBoolean: true,
        resourceId: (speaker as any)._id,
        featureId: (portableFeature as any)._id,
      });

      // Create feature values for Video Camera
      await this.featureValueService.create({
        valueString: '3840x2160 4K UHD',
        resourceId: (videoCamera as any)._id,
        featureId: (resolutionFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: 'HDMI, USB-C, Wi-Fi',
        resourceId: (videoCamera as any)._id,
        featureId: (connectivityFeature as any)._id,
      });

      await this.featureValueService.create({
        valueBoolean: true,
        resourceId: (videoCamera as any)._id,
        featureId: (portableFeature as any)._id,
      });

      // Create feature values for Laptop
      await this.featureValueService.create({
        valueString: 'Intel Core i5 11ª geração',
        resourceId: (laptop as any)._id,
        featureId: (processorFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: '8GB DDR4',
        resourceId: (laptop as any)._id,
        featureId: (ramFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: '256GB SSD',
        resourceId: (laptop as any)._id,
        featureId: (storageFeature as any)._id,
      });

      // Create feature values for Tablet
      await this.featureValueService.create({
        valueString: 'Snapdragon 865',
        resourceId: (tablet as any)._id,
        featureId: (processorFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: '6GB',
        resourceId: (tablet as any)._id,
        featureId: (ramFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: '128GB',
        resourceId: (tablet as any)._id,
        featureId: (storageFeature as any)._id,
      });

      // Create feature values for Adapter
      await this.featureValueService.create({
        valueString: 'N/A',
        resourceId: (adapter as any)._id,
        featureId: (processorFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: 'N/A',
        resourceId: (adapter as any)._id,
        featureId: (ramFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: 'N/A',
        resourceId: (adapter as any)._id,
        featureId: (storageFeature as any)._id,
      });

      // Create feature values for Oscilloscope
      await this.featureValueService.create({
        valueString: '100 MHz, 4 canais',
        resourceId: (oscilloscope as any)._id,
        featureId: (capacityFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: '110V/220V',
        resourceId: (oscilloscope as any)._id,
        featureId: (voltageFeature as any)._id,
      });

      await this.featureValueService.create({
        valueBoolean: true,
        resourceId: (oscilloscope as any)._id,
        featureId: (calibrationFeature as any)._id,
      });

      // Create feature values for Multimeter
      await this.featureValueService.create({
        valueString: '1000V, 10A',
        resourceId: (multimeter as any)._id,
        featureId: (capacityFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: 'Bateria 9V',
        resourceId: (multimeter as any)._id,
        featureId: (voltageFeature as any)._id,
      });

      await this.featureValueService.create({
        valueBoolean: true,
        resourceId: (multimeter as any)._id,
        featureId: (calibrationFeature as any)._id,
      });

      // Create feature values for Power Supply
      await this.featureValueService.create({
        valueString: '0-30V, 0-5A',
        resourceId: (powerSupply as any)._id,
        featureId: (capacityFeature as any)._id,
      });

      await this.featureValueService.create({
        valueString: '110V/220V',
        resourceId: (powerSupply as any)._id,
        featureId: (voltageFeature as any)._id,
      });

      await this.featureValueService.create({
        valueBoolean: false,
        resourceId: (powerSupply as any)._id,
        featureId: (calibrationFeature as any)._id,
      });

      this.logger.log('✅ Feature values criados');

      // Display summary
      const categoriesCount = await this.categoryModel.countDocuments();
      const featuresCount = await this.featureModel.countDocuments();
      const resourcesCount = await this.resourceModel.countDocuments();
      const featureValuesCount = await this.featureValueModel.countDocuments();

      this.logger.log('🎉 Auto-seed concluído com sucesso!');
      this.logger.log(`📊 Resumo: ${categoriesCount} categorias, ${featuresCount} features, ${resourcesCount} resources, ${featureValuesCount} feature values`);

    } catch (error) {
      this.logger.error('❌ Erro durante execução do seed:', error);
      throw error;
    }
  }
}
