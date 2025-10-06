import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category.controller';
import { FeatureController } from './controllers/feature.controller';
import { ResourceController } from './controllers/resource.controller';
import { FeatureValueController } from './controllers/feature-value.controller';
import { CategoryService } from './services/category.service';
import { FeatureService } from './services/feature.service';
import { ResourceService } from './services/resource.service';
import { FeatureValueService } from './services/feature-value.service';
import { Category } from './entities/category.entity';
import { Feature } from './entities/feature.entity';
import { Resource } from './entities/resource.entity';
import { FeatureValue } from './entities/feature-value.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'resources.db',
      entities: [Category, Feature, Resource, FeatureValue],
      synchronize: true, // Only for development, use migrations in production
      logging: false,
    }),
    TypeOrmModule.forFeature([Category, Feature, Resource, FeatureValue]),
  ],
  controllers: [
    CategoryController,
    FeatureController,
    ResourceController,
    FeatureValueController,
  ],
  providers: [
    CategoryService,
    FeatureService,
    ResourceService,
    FeatureValueService,
  ],
})
export class AppModule {}