import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureValueDto } from './create-feature-value.dto';

export class UpdateFeatureValueDto extends PartialType(CreateFeatureValueDto) {}