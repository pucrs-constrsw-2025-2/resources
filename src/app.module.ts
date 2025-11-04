import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryController } from "./controllers/category.controller";
import { FeatureController } from "./controllers/feature.controller";
import { ResourceController } from "./controllers/resource.controller";
import { FeatureValueController } from "./controllers/feature-value.controller";
import { ValueTypesController } from "./controllers/value-types.controller";
import { CategoryService } from "./services/category.service";
import { FeatureService } from "./services/feature.service";
import { ResourceService } from "./services/resource.service";
import { FeatureValueService } from "./services/feature-value.service";
import { Category, CategorySchema } from "./entities/category.entity";
import { Feature, FeatureSchema } from "./entities/feature.entity";
import { Resource, ResourceSchema } from "./entities/resource.entity";
import {
  FeatureValue,
  FeatureValueSchema,
} from "./entities/feature-value.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../../.env", // Path to root .env file
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>(
          "MONGODB_INTERNAL_HOST",
          "localhost",
        );
        const port = configService.get<string>(
          "MONGODB_INTERNAL_PORT",
          "27017",
        );
        const username = configService.get<string>(
          "RESOURCES_MONGODB_USER",
          "resources",
        );
        const password = configService.get<string>(
          "RESOURCES_MONGODB_PASSWORD",
          "a12345678",
        );
        const database = configService.get<string>(
          "RESOURCES_MONGODB_DB",
          "resources",
        );

        const uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

        // Log connection info without exposing the password
        const maskedUri = `mongodb://${username}:***@${host}:${port}/${database}?authSource=admin`;
        console.log("MongoDB URI:", maskedUri);

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Feature.name, schema: FeatureSchema },
      { name: Resource.name, schema: ResourceSchema },
      { name: FeatureValue.name, schema: FeatureValueSchema },
    ]),
  ],
  controllers: [
    CategoryController,
    FeatureController,
    ResourceController,
    FeatureValueController,
    ValueTypesController,
  ],
  providers: [
    CategoryService,
    FeatureService,
    ResourceService,
    FeatureValueService,
  ],
})
export class AppModule {}
