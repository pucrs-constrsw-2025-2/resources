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
import { FeatureService } from '../services/feature.service';
import { CreateFeatureDto } from '../dto/create-feature.dto';
import { UpdateFeatureDto } from '../dto/update-feature.dto';
import { Feature } from '../entities/feature.entity';

@ApiTags('features')
@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new feature' })
  @ApiResponse({
    status: 201,
    description: 'The feature has been successfully created.',
    type: Feature,
  })
  async create(
    @Body(ValidationPipe) createFeatureDto: CreateFeatureDto,
  ): Promise<Feature> {
    return await this.featureService.create(createFeatureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all features' })
  @ApiResponse({
    status: 200,
    description: 'Return all features.',
    type: [Feature],
  })
  async findAll(): Promise<Feature[]> {
    return await this.featureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a feature by id' })
  @ApiParam({ name: 'id', description: 'Feature ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the feature.',
    type: Feature,
  })
  @ApiResponse({ status: 404, description: 'Feature not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Feature> {
    return await this.featureService.findOne(id);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get features by category id' })
  @ApiParam({ name: 'categoryId', description: 'Category ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return features for the category.',
    type: [Feature],
  })
  async findByCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Feature[]> {
    return await this.featureService.findByCategory(categoryId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a feature' })
  @ApiParam({ name: 'id', description: 'Feature ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The feature has been successfully updated.',
    type: Feature,
  })
  @ApiResponse({ status: 404, description: 'Feature not found.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateFeatureDto: UpdateFeatureDto,
  ): Promise<Feature> {
    return await this.featureService.update(id, updateFeatureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feature' })
  @ApiParam({ name: 'id', description: 'Feature ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The feature has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Feature not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.featureService.remove(id);
  }
}