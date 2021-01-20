import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  getAll(): string {
    return 'Hi, are u looking for the other side?';
  }
  @Get('health')
  getHealthResponse() {
    const response = {
      status: 'ok',
      serverTime: Date.now(),
    };
    return JSON.stringify(response);
  }
}
