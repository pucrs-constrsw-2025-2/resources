import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { Resource } from '../entities/resource.entity';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { UpdateResourceDto } from '../dto/update-resource.dto';

describe('ResourceService', () => {
  let service: ResourceService;
  let repository: Repository<Resource>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourceService,
        {
          provide: getRepositoryToken(Resource),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ResourceService>(ResourceService);
    repository = module.get<Repository<Resource>>(getRepositoryToken(Resource));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new resource', async () => {
      const createResourceDto: CreateResourceDto = {
        name: 'Test Resource',
        quantity: 10,
        status: true,
        categoryId: 'category-id',
      };
      const savedResource = {
        id: '1',
        ...createResourceDto,
        category: null,
        features: [],
      };

      mockRepository.create.mockReturnValue(savedResource);
      mockRepository.save.mockResolvedValue(savedResource);

      const result = await service.create(createResourceDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createResourceDto);
      expect(mockRepository.save).toHaveBeenCalledWith(savedResource);
      expect(result).toEqual(savedResource);
    });
  });

  describe('findAll', () => {
    it('should return an array of resources', async () => {
      const resources = [
        {
          id: '1',
          name: 'Resource 1',
          quantity: 10,
          status: true,
          categoryId: 'cat-1',
          category: null,
          features: [],
        },
        {
          id: '2',
          name: 'Resource 2',
          quantity: 5,
          status: false,
          categoryId: 'cat-2',
          category: null,
          features: [],
        },
      ];

      mockRepository.find.mockResolvedValue(resources);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['category', 'features', 'features.feature'],
      });
      expect(result).toEqual(resources);
    });
  });

  describe('findOne', () => {
    it('should return a resource by id', async () => {
      const resource = {
        id: '1',
        name: 'Test Resource',
        quantity: 10,
        status: true,
        categoryId: 'cat-1',
        category: null,
        features: [],
      };

      mockRepository.findOne.mockResolvedValue(resource);

      const result = await service.findOne('1');

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['category', 'features', 'features.feature'],
      });
      expect(result).toEqual(resource);
    });

    it('should throw NotFoundException when resource not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByCategory', () => {
    it('should return resources by category id', async () => {
      const resources = [
        {
          id: '1',
          name: 'Resource 1',
          quantity: 10,
          status: true,
          categoryId: 'cat-1',
          category: null,
          features: [],
        },
      ];

      mockRepository.find.mockResolvedValue(resources);

      const result = await service.findByCategory('cat-1');

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { categoryId: 'cat-1' },
        relations: ['category', 'features', 'features.feature'],
      });
      expect(result).toEqual(resources);
    });
  });

  describe('update', () => {
    it('should update a resource', async () => {
      const updateResourceDto: UpdateResourceDto = { name: 'Updated Resource', quantity: 20 };
      const existingResource = {
        id: '1',
        name: 'Test Resource',
        quantity: 10,
        status: true,
        categoryId: 'cat-1',
        category: null,
        features: [],
      };
      const updatedResource = { ...existingResource, ...updateResourceDto };

      mockRepository.findOne.mockResolvedValue(existingResource);
      mockRepository.save.mockResolvedValue(updatedResource);

      const result = await service.update('1', updateResourceDto);

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith(updatedResource);
      expect(result).toEqual(updatedResource);
    });

    it('should throw NotFoundException when resource not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('1', { name: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a resource', async () => {
      const resource = {
        id: '1',
        name: 'Test Resource',
        quantity: 10,
        status: true,
        categoryId: 'cat-1',
        category: null,
        features: [],
      };

      mockRepository.findOne.mockResolvedValue(resource);
      mockRepository.remove.mockResolvedValue(resource);

      await service.remove('1');

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.remove).toHaveBeenCalledWith(resource);
    });

    it('should throw NotFoundException when resource not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});