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
import { FeatureValueService } from '../services/feature-value.service';
import { CreateFeatureValueDto } from '../dto/create-feature-value.dto';
import { UpdateFeatureValueDto } from '../dto/update-feature-value.dto';
import { FeatureValue } from '../entities/feature-value.entity';

@ApiTags('feature-values')
@Controller('feature-values')
export class FeatureValueController {
  constructor(private readonly featureValueService: FeatureValueService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new feature value' })
  @ApiResponse({
    status: 201,
    description: 'The feature value has been successfully created.',
    type: FeatureValue,
  })
  async create(
    @Body(ValidationPipe) createFeatureValueDto: CreateFeatureValueDto,
  ): Promise<FeatureValue> {
    return await this.featureValueService.create(createFeatureValueDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feature values' })
  @ApiResponse({
    status: 200,
    description: 'Return all feature values.',
    type: [FeatureValue],
  })
  async findAll(): Promise<FeatureValue[]> {
    return await this.featureValueService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a feature value by id' })
  @ApiParam({ name: 'id', description: 'FeatureValue ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the feature value.',
    type: FeatureValue,
  })
  @ApiResponse({ status: 404, description: 'FeatureValue not found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<FeatureValue> {
    return await this.featureValueService.findOne(id);
  }

  @Get('resource/:resourceId')
  @ApiOperation({ summary: 'Get feature values by resource id' })
  @ApiParam({ name: 'resourceId', description: 'Resource ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return feature values for the resource.',
    type: [FeatureValue],
  })
  async findByResource(
    @Param('resourceId', ParseUUIDPipe) resourceId: string,
  ): Promise<FeatureValue[]> {
    return await this.featureValueService.findByResource(resourceId);
  }

  @Get('feature/:featureId')
  @ApiOperation({ summary: 'Get feature values by feature id' })
  @ApiParam({ name: 'featureId', description: 'Feature ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return feature values for the feature.',
    type: [FeatureValue],
  })
  async findByFeature(
    @Param('featureId', ParseUUIDPipe) featureId: string,
  ): Promise<FeatureValue[]> {
    return await this.featureValueService.findByFeature(featureId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a feature value' })
  @ApiParam({ name: 'id', description: 'FeatureValue ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The feature value has been successfully updated.',
    type: FeatureValue,
  })
  @ApiResponse({ status: 404, description: 'FeatureValue not found.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateFeatureValueDto: UpdateFeatureValueDto,
  ): Promise<FeatureValue> {
    return await this.featureValueService.update(id, updateFeatureValueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feature value' })
  @ApiParam({ name: 'id', description: 'FeatureValue ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The feature value has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'FeatureValue not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.featureValueService.remove(id);
  }
}