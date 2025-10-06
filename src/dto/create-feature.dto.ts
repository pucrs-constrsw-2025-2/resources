import { IsString, IsNotEmpty, IsEnum, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValueType } from '../enums/value-type.enum';

export class CreateFeatureDto {
  @ApiProperty({
    description: 'Feature name',
    example: 'Screen Size',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Feature type',
    enum: ValueType,
    example: ValueType.STRING,
  })
  @IsEnum(ValueType)
  type: ValueType;

  @ApiProperty({
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}