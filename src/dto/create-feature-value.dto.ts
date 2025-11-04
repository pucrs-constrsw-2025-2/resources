import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureValueDto {
  @ApiProperty({
    description: 'String value',
    example: '6.1 inches',
    required: false,
  })
  @IsOptional()
  @IsString()
  valueString?: string;

  @ApiProperty({
    description: 'Number value',
    example: 128,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  valueNumber?: number;

  @ApiProperty({
    description: 'Boolean value',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  valueBoolean?: boolean;

  @ApiProperty({
    description: 'Resource ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  resourceId: string;

  @ApiProperty({
    description: 'Feature ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  featureId: string;
}
