import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Resource, ResourceDocument } from '../entities/resource.entity';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { UpdateResourceDto } from '../dto/update-resource.dto';

@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(Resource.name)
    private readonly resourceModel: Model<ResourceDocument>,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = new this.resourceModel(createResourceDto);
    return await resource.save();
  }

  async findAll(): Promise<Resource[]> {
    return await this.resourceModel.find().populate('categoryId').exec();
  }

  async findOne(id: string): Promise<Resource> {
    const resource = await this.resourceModel.findById(id).populate('categoryId').exec();

    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return resource;
  }

  async findByCategory(categoryId: string): Promise<Resource[]> {
    return await this.resourceModel
      .find({ categoryId: new Types.ObjectId(categoryId) })
      .populate('categoryId')
      .exec();
  }

  async update(id: string, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    const resource = await this.resourceModel
      .findByIdAndUpdate(id, updateResourceDto, { new: true })
      .populate('categoryId')
      .exec();

    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return resource;
  }

  async remove(id: string): Promise<void> {
    const result = await this.resourceModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
  }
}