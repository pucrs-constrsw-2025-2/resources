import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feature, FeatureDocument } from '../entities/feature.entity';
import { CreateFeatureDto } from '../dto/create-feature.dto';
import { UpdateFeatureDto } from '../dto/update-feature.dto';

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel(Feature.name)
    private readonly featureModel: Model<FeatureDocument>,
  ) {}

  async create(createFeatureDto: CreateFeatureDto): Promise<Feature> {
    const feature = new this.featureModel(createFeatureDto);
    return await feature.save();
  }

  async findAll(): Promise<Feature[]> {
    return await this.featureModel.find().exec();
  }

  async findOne(id: string): Promise<Feature> {
    const feature = await this.featureModel.findById(id).exec();

    if (!feature) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }

    return feature;
  }

  async findByCategory(categoryId: string): Promise<Feature[]> {
    return await this.featureModel.find({ categoryId }).exec();
  }

  async update(id: string, updateFeatureDto: UpdateFeatureDto): Promise<Feature> {
    const feature = await this.featureModel
      .findByIdAndUpdate(id, updateFeatureDto, { new: true })
      .exec();

    if (!feature) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }

    return feature;
  }

  async remove(id: string): Promise<void> {
    const result = await this.featureModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }
  }
}
