import { Controller, Get, Header } from '@nestjs/common';
import { register, collectDefaultMetrics } from 'prom-client';

// Initialize default metrics collection once at module load
collectDefaultMetrics();

@Controller('actuator')
export class MetricsController {
  @Get('prometheus')
  @Header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
  async getMetrics(): Promise<string> {
    return await register.metrics();
  }
}


