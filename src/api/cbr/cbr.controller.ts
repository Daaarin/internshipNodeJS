import { Controller, Get, Param } from '@nestjs/common'
import { IResponse } from '../api.module'
import { CbrService } from './cbr.service'
import { AppService } from '../../app.service'

@Controller('cbr')
export class CbrController {
  constructor(private readonly cbrService: CbrService) {}
  @Get(':date')
  async getRate(@Param('date') params): Promise<IResponse> {
    return await this.cbrService.getRate(params.date)
  }
}
