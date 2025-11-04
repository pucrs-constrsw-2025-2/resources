import { IsString, IsNotEmpty, IsEnum, MaxLength } from 'class-validator';
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
    description: 'Feature value type',
    enum: ValueType,
    example: ValueType.STRING,
  })
  @IsEnum(ValueType)
  type: ValueType;

  @ApiProperty({
    description: 'Category ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
