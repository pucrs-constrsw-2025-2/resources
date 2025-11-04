import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Resources API")
    .setDescription("API for managing resources with categories and features")
    .setVersion("1.0")
    .addTag("categories", "Categories management")
    .addTag("features", "Features management")
    .addTag("resources", "Resources management")
    .addTag("feature-values", "Feature values management")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Global API prefix
  app.setGlobalPrefix("api/v1");

  // Prefer service-scoped env var from root .env, fallback to PORT, then default
  const port = Number(
    process.env.RESOURCES_INTERNAL_API_PORT || process.env.PORT || 3000,
  );
  await app.listen(port);
  const host = process.env.RESOURCES_INTERNAL_HOST || "localhost";
  const protocol = process.env.RESOURCES_INTERNAL_PROTOCOL || "http";
  console.log(`Application is running on: ${protocol}://${host}:${port}`);
  console.log(
    `Swagger documentation is available at: ${protocol}://${host}:${port}/api`,
  );
}

bootstrap();
