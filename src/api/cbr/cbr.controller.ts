import { Controller, Get } from '@nestjs/common';

@Controller('cbr')
export class CbrController {
  @Get(':id')
  getKeyRate() {
    //const id = params.id;
    //request
    //handling response
  }
}
