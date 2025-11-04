import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Resource, ResourceDocument } from "../entities/resource.entity";
import { CreateResourceDto } from "../dto/create-resource.dto";
import { UpdateResourceDto } from "../dto/update-resource.dto";

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
    return await this.resourceModel.find().exec();
  }

  async findOne(id: string): Promise<Resource> {
    const resource = await this.resourceModel.findById(id).exec();

    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return resource;
  }

  async findByCategory(categoryId: string): Promise<Resource[]> {
    return await this.resourceModel.find({ categoryId }).exec();
  }

  async update(
    id: string,
    updateResourceDto: UpdateResourceDto,
  ): Promise<Resource> {
    const resource = await this.resourceModel
      .findByIdAndUpdate(id, updateResourceDto, { new: true })
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
