import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FeatureValue, FeatureValueDocument } from '../entities/feature-value.entity';
import { CreateFeatureValueDto } from '../dto/create-feature-value.dto';
import { UpdateFeatureValueDto } from '../dto/update-feature-value.dto';

@Injectable()
export class FeatureValueService {
  constructor(
    @InjectModel(FeatureValue.name)
    private readonly featureValueModel: Model<FeatureValueDocument>,
  ) {}

  async create(createFeatureValueDto: CreateFeatureValueDto): Promise<FeatureValue> {
    const featureValue = new this.featureValueModel(createFeatureValueDto);
    return await featureValue.save();
  }

  async findAll(): Promise<FeatureValue[]> {
    return await this.featureValueModel
      .find()
      .populate('resourceId')
      .populate('featureId')
      .exec();
  }

  async findOne(id: string): Promise<FeatureValue> {
    const featureValue = await this.featureValueModel
      .findById(id)
      .populate('resourceId')
      .populate('featureId')
      .exec();

    if (!featureValue) {
      throw new NotFoundException(`FeatureValue with ID ${id} not found`);
    }

    return featureValue;
  }

  async findByResource(resourceId: string): Promise<FeatureValue[]> {
    return await this.featureValueModel
      .find({ resourceId: new Types.ObjectId(resourceId) })
      .populate('resourceId')
      .populate('featureId')
      .exec();
  }

  async findByFeature(featureId: string): Promise<FeatureValue[]> {
    return await this.featureValueModel
      .find({ featureId: new Types.ObjectId(featureId) })
      .populate('resourceId')
      .populate('featureId')
      .exec();
  }

  async update(id: string, updateFeatureValueDto: UpdateFeatureValueDto): Promise<FeatureValue> {
    const featureValue = await this.featureValueModel
      .findByIdAndUpdate(id, updateFeatureValueDto, { new: true })
      .populate('resourceId')
      .populate('featureId')
      .exec();

    if (!featureValue) {
      throw new NotFoundException(`FeatureValue with ID ${id} not found`);
    }

    return featureValue;
  }

  async remove(id: string): Promise<void> {
    const result = await this.featureValueModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException(`FeatureValue with ID ${id} not found`);
    }
  }
}