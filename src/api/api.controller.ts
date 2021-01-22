import { Controller, Get, Param } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  getAll(): string {
    return 'Hi, are u looking for the other side?';
  }
  @Get(':id')
  getRate(@Param('id') params) {
    return 5;
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
