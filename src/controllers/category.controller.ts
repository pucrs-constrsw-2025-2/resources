import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  ValidationPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { CategoryService } from "../services/category.service";
import { ResourceService } from "../services/resource.service";
import { FeatureService } from "../services/feature.service";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { Category } from "../entities/category.entity";

@ApiTags("categories")
@Controller("categories")
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly resourceService: ResourceService,
    private readonly featureService: FeatureService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new category" })
  @ApiResponse({
    status: 201,
    description: "The category has been successfully created.",
    type: Category,
  })
  async create(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all categories" })
  @ApiResponse({
    status: 200,
    description: "Return all categories.",
    type: [Category],
  })
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a category by id" })
  @ApiParam({ name: "id", description: "Category ID", type: "string" })
  @ApiResponse({
    status: 200,
    description: "Return the category.",
    type: Category,
  })
  @ApiResponse({ status: 404, description: "Category not found." })
  async findOne(@Param("id") id: string): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a category" })
  @ApiParam({ name: "id", description: "Category ID", type: "string" })
  @ApiResponse({
    status: 200,
    description: "The category has been successfully updated.",
    type: Category,
  })
  @ApiResponse({ status: 404, description: "Category not found." })
  async update(
    @Param("id") id: string,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Replace a category" })
  @ApiParam({ name: "id", description: "Category ID", type: "string" })
  async replace(
    @Param("id") id: string,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a category" })
  @ApiParam({ name: "id", description: "Category ID", type: "string" })
  @ApiResponse({
    status: 200,
    description: "The category has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Category not found." })
  async remove(@Param("id") id: string): Promise<void> {
    return await this.categoryService.remove(id);
  }

  @Get(":id/resources")
  @ApiOperation({ summary: "Get resources for a category" })
  async getResources(@Param("id") id: string) {
    return await this.resourceService.findByCategory(id);
  }

  @Post(":id/resources")
  @ApiOperation({ summary: "Create a resource in a category" })
  async createResource(
    @Param("id") id: string,
    @Body(ValidationPipe) createResourceDto: any,
  ) {
    createResourceDto.categoryId = id;
    return await this.resourceService.create(createResourceDto);
  }

  @Get(":id/features")
  @ApiOperation({ summary: "Get features for a category" })
  async getFeatures(@Param("id") id: string) {
    return await this.featureService.findByCategory(id);
  }

  @Post(":id/features")
  @ApiOperation({ summary: "Create a feature in a category" })
  async createFeature(
    @Param("id") id: string,
    @Body(ValidationPipe) createFeatureDto: any,
  ) {
    createFeatureDto.categoryId = id;
    return await this.featureService.create(createFeatureDto);
  }
}
