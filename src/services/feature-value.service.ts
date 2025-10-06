import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeatureValue } from '../entities/feature-value.entity';
import { CreateFeatureValueDto } from '../dto/create-feature-value.dto';
import { UpdateFeatureValueDto } from '../dto/update-feature-value.dto';

@Injectable()
export class FeatureValueService {
  constructor(
    @InjectRepository(FeatureValue)
    private readonly featureValueRepository: Repository<FeatureValue>,
  ) {}

  async create(createFeatureValueDto: CreateFeatureValueDto): Promise<FeatureValue> {
    const featureValue = this.featureValueRepository.create(createFeatureValueDto);
    return await this.featureValueRepository.save(featureValue);
  }

  async findAll(): Promise<FeatureValue[]> {
    return await this.featureValueRepository.find({
      relations: ['resource', 'feature'],
    });
  }

  async findOne(id: string): Promise<FeatureValue> {
    const featureValue = await this.featureValueRepository.findOne({
      where: { id },
      relations: ['resource', 'feature'],
    });

    if (!featureValue) {
      throw new NotFoundException(`FeatureValue with ID ${id} not found`);
    }

    return featureValue;
  }

  async findByResource(resourceId: string): Promise<FeatureValue[]> {
    return await this.featureValueRepository.find({
      where: { resourceId },
      relations: ['resource', 'feature'],
    });
  }

  async findByFeature(featureId: string): Promise<FeatureValue[]> {
    return await this.featureValueRepository.find({
      where: { featureId },
      relations: ['resource', 'feature'],
    });
  }

  async update(id: string, updateFeatureValueDto: UpdateFeatureValueDto): Promise<FeatureValue> {
    const featureValue = await this.findOne(id);
    Object.assign(featureValue, updateFeatureValueDto);
    return await this.featureValueRepository.save(featureValue);
  }

  async remove(id: string): Promise<void> {
    const featureValue = await this.findOne(id);
    await this.featureValueRepository.remove(featureValue);
  }
}