import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ResourceService } from '../services/resource.service';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { UpdateResourceDto } from '../dto/update-resource.dto';
import { Resource } from '../entities/resource.entity';

@ApiTags('resources')
@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new resource' })
  @ApiResponse({
    status: 201,
    description: 'The resource has been successfully created.',
    type: Resource,
  })
  async create(
    @Body(ValidationPipe) createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    return await this.resourceService.create(createResourceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({
    status: 200,
    description: 'Return all resources.',
    type: [Resource],
  })
  async findAll(): Promise<Resource[]> {
    return await this.resourceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resource by id' })
  @ApiParam({ name: 'id', description: 'Resource ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the resource.',
    type: Resource,
  })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Resource> {
    return await this.resourceService.findOne(id);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get resources by category id' })
  @ApiParam({ name: 'categoryId', description: 'Category ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return resources for the category.',
    type: [Resource],
  })
  async findByCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Resource[]> {
    return await this.resourceService.findByCategory(categoryId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a resource' })
  @ApiParam({ name: 'id', description: 'Resource ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been successfully updated.',
    type: Resource,
  })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateResourceDto: UpdateResourceDto,
  ): Promise<Resource> {
    return await this.resourceService.update(id, updateResourceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a resource' })
  @ApiParam({ name: 'id', description: 'Resource ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.resourceService.remove(id);
  }
}