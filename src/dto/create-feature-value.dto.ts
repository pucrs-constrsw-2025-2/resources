import { IsString, IsNumber, IsBoolean, IsUUID, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureValueDto {
  @ApiProperty({
    description: 'String value for the feature',
    example: '6.1 inches',
    required: false,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  valueString?: string;

  @ApiProperty({
    description: 'Number value for the feature',
    example: 6.1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  valueNumber?: number;

  @ApiProperty({
    description: 'Boolean value for the feature',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  valueBoolean?: boolean;

  @ApiProperty({
    description: 'Resource ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  resourceId: string;

  @ApiProperty({
    description: 'Feature ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  featureId: string;
}