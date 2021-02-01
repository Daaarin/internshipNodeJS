import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { IResponse } from '../api.module';
import { CbrService } from './cbr.service';
import { AppService } from '../../app.service';

@Controller('api/cbr')
export class CbrController {
  constructor(private readonly cbrService: CbrService) {}

  @Get(':date')
  async getRate(@Param('date') date, @Res() res): Promise<IResponse> {
    return await this.cbrService.getRate(date, res);
  }

  @Get()
  sayHi(): string {
    return this.cbrService.sayHi();
  }
}
