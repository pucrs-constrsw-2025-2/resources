import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ValueType } from '../enums/value-type.enum';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('value-types')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('value-types')
export class ValueTypesController {
  @Get()
  @ApiOperation({ summary: 'Get available value types (enum)' })
  findAll() {
    return Object.values(ValueType);
  }
}
