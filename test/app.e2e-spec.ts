import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../src/entities/category.entity';
import { Feature, FeatureSchema } from '../src/entities/feature.entity';
import { Resource, ResourceSchema } from '../src/entities/resource.entity';
import { FeatureValue, FeatureValueSchema } from '../src/entities/feature-value.entity';
import { CategoryController } from '../src/controllers/category.controller';
import { FeatureController } from '../src/controllers/feature.controller';
import { ResourceController } from '../src/controllers/resource.controller';
import { FeatureValueController } from '../src/controllers/feature-value.controller';
import { CategoryService } from '../src/services/category.service';
import { FeatureService } from '../src/services/feature.service';
import { ResourceService } from '../src/services/resource.service';
import { FeatureValueService } from '../src/services/feature-value.service';
import { ValueType } from '../src/enums/value-type.enum';

describe('Resources API (e2e)', () => {
  let app: INestApplication;
  let categoryId: string;
  let featureId: string;
  let resourceId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/resources-test'),
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
      ],
      providers: [
        CategoryService,
        FeatureService,
        ResourceService,
        FeatureValueService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/categories (POST)', () => {
    it('should create a new category', () => {
      return request(app.getHttpServer())
        .post('/categories')
        .send({
          name: 'Test Category',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test Category');
          categoryId = res.body.id;
        });
    });

    it('should validate required fields', () => {
      return request(app.getHttpServer())
        .post('/categories')
        .send({})
        .expect(400);
    });
  });

  describe('/categories (GET)', () => {
    beforeEach(async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: 'Test Category' });
      categoryId = response.body.id;
    });

    it('should return all categories', () => {
      return request(app.getHttpServer())
        .get('/categories')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('/categories/:id (GET)', () => {
    beforeEach(async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: 'Test Category' });
      categoryId = response.body.id;
    });

    it('should return a category by id', () => {
      return request(app.getHttpServer())
        .get(`/categories/${categoryId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(categoryId);
          expect(res.body.name).toBe('Test Category');
        });
    });

    it('should return 404 for non-existent category', () => {
      return request(app.getHttpServer())
        .get('/categories/00000000-0000-4000-8000-000000000000')
        .expect(404);
    });
  });

  describe('/features (POST)', () => {
    beforeEach(async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: 'Test Category' });
      categoryId = response.body.id;
    });

    it('should create a new feature', () => {
      return request(app.getHttpServer())
        .post('/features')
        .send({
          name: 'Test Feature',
          type: ValueType.STRING,
          categoryId: categoryId,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test Feature');
          expect(res.body.type).toBe(ValueType.STRING);
          featureId = res.body.id;
        });
    });

    it('should validate feature type enum', () => {
      return request(app.getHttpServer())
        .post('/features')
        .send({
          name: 'Test Feature',
          type: 'INVALID_TYPE',
          categoryId: categoryId,
        })
        .expect(400);
    });
  });

  describe('/resources (POST)', () => {
    beforeEach(async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: 'Test Category' });
      categoryId = response.body.id;
    });

    it('should create a new resource', () => {
      return request(app.getHttpServer())
        .post('/resources')
        .send({
          name: 'Test Resource',
          quantity: 10,
          status: true,
          categoryId: categoryId,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test Resource');
          expect(res.body.quantity).toBe(10);
          expect(res.body.status).toBe(true);
          resourceId = res.body.id;
        });
    });

    it('should validate quantity is not negative', () => {
      return request(app.getHttpServer())
        .post('/resources')
        .send({
          name: 'Test Resource',
          quantity: -1,
          status: true,
          categoryId: categoryId,
        })
        .expect(400);
    });
  });

  describe('/feature-values (POST)', () => {
    beforeEach(async () => {
      const categoryResponse = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: 'Test Category' });
      categoryId = categoryResponse.body.id;

      const featureResponse = await request(app.getHttpServer())
        .post('/features')
        .send({
          name: 'Test Feature',
          type: ValueType.STRING,
          categoryId: categoryId,
        });
      featureId = featureResponse.body.id;

      const resourceResponse = await request(app.getHttpServer())
        .post('/resources')
        .send({
          name: 'Test Resource',
          quantity: 10,
          status: true,
          categoryId: categoryId,
        });
      resourceId = resourceResponse.body.id;
    });

    it('should create a new feature value with string value', () => {
      return request(app.getHttpServer())
        .post('/feature-values')
        .send({
          valueString: 'Test String Value',
          resourceId: resourceId,
          featureId: featureId,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.valueString).toBe('Test String Value');
          expect(res.body.resourceId).toBe(resourceId);
          expect(res.body.featureId).toBe(featureId);
        });
    });

    it('should create a new feature value with number value', () => {
      return request(app.getHttpServer())
        .post('/feature-values')
        .send({
          valueNumber: 42.5,
          resourceId: resourceId,
          featureId: featureId,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.valueNumber).toBe(42.5);
        });
    });

    it('should create a new feature value with boolean value', () => {
      return request(app.getHttpServer())
        .post('/feature-values')
        .send({
          valueBoolean: true,
          resourceId: resourceId,
          featureId: featureId,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.valueBoolean).toBe(true);
        });
    });
  });

  describe('Integration flow', () => {
    it('should create a complete category with features and resources', async () => {
      // Create category
      const categoryResponse = await request(app.getHttpServer())
        .post('/categories')
        .send({ name: 'Electronics' })
        .expect(201);

      const categoryId = categoryResponse.body.id;

      // Create feature
      const featureResponse = await request(app.getHttpServer())
        .post('/features')
        .send({
          name: 'Screen Size',
          type: ValueType.STRING,
          categoryId: categoryId,
        })
        .expect(201);

      const featureId = featureResponse.body.id;

      // Create resource
      const resourceResponse = await request(app.getHttpServer())
        .post('/resources')
        .send({
          name: 'iPhone 14',
          quantity: 10,
          status: true,
          categoryId: categoryId,
        })
        .expect(201);

      const resourceId = resourceResponse.body.id;

      // Create feature value
      await request(app.getHttpServer())
        .post('/feature-values')
        .send({
          valueString: '6.1 inches',
          resourceId: resourceId,
          featureId: featureId,
        })
        .expect(201);

      // Verify relationships
      const categoryWithRelations = await request(app.getHttpServer())
        .get(`/categories/${categoryId}`)
        .expect(200);

      expect(categoryWithRelations.body.resources).toHaveLength(1);
      expect(categoryWithRelations.body.features).toHaveLength(1);

      const resourceWithFeatures = await request(app.getHttpServer())
        .get(`/resources/${resourceId}`)
        .expect(200);

      expect(resourceWithFeatures.body.features).toHaveLength(1);
      expect(resourceWithFeatures.body.features[0].valueString).toBe('6.1 inches');
    });
  });
});