import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ValueType } from '../enums/value-type.enum';

@ApiTags('value-types')
@Controller('value-types')
export class ValueTypesController {
  @Get()
  @ApiOperation({ summary: 'Get available value types (enum)' })
  findAll() {
    return Object.values(ValueType);
  }
}
