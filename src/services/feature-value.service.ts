import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  FeatureValue,
  FeatureValueDocument,
} from "../entities/feature-value.entity";
import { CreateFeatureValueDto } from "../dto/create-feature-value.dto";
import { UpdateFeatureValueDto } from "../dto/update-feature-value.dto";

@Injectable()
export class FeatureValueService {
  constructor(
    @InjectModel(FeatureValue.name)
    private readonly featureValueModel: Model<FeatureValueDocument>,
  ) {}

  async create(
    createFeatureValueDto: CreateFeatureValueDto,
  ): Promise<FeatureValue> {
    const featureValue = new this.featureValueModel(createFeatureValueDto);
    return await featureValue.save();
  }

  async findAll(): Promise<FeatureValue[]> {
    return await this.featureValueModel.find().exec();
  }

  async findOne(id: string): Promise<FeatureValue> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ObjectId format: ${id}`);
    }

    const featureValue = await this.featureValueModel.findById(id).exec();

    if (!featureValue) {
      throw new NotFoundException(`FeatureValue with ID ${id} not found`);
    }

    return featureValue;
  }

  async findByResource(resourceId: string): Promise<FeatureValue[]> {
    // Validate ObjectId format to prevent injection
    if (!Types.ObjectId.isValid(resourceId)) {
      return [];
    }
    return await this.featureValueModel.find({ resourceId }).exec();
  }

  async findByFeature(featureId: string): Promise<FeatureValue[]> {
    // Validate ObjectId format to prevent injection
    if (!Types.ObjectId.isValid(featureId)) {
      return [];
    }
    return await this.featureValueModel.find({ featureId }).exec();
  }

  async update(
    id: string,
    updateFeatureValueDto: UpdateFeatureValueDto,
  ): Promise<FeatureValue> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ObjectId format: ${id}`);
    }

    const featureValue = await this.featureValueModel
      .findByIdAndUpdate(id, updateFeatureValueDto, { new: true })
      .exec();

    if (!featureValue) {
      throw new NotFoundException(`FeatureValue with ID ${id} not found`);
    }

    return featureValue;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ObjectId format: ${id}`);
    }

    const result = await this.featureValueModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`FeatureValue with ID ${id} not found`);
    }
  }
}
