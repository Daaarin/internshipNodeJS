import { Controller, Get, Res } from '@nestjs/common';
import { RecordEntity } from './database/entities/record.entity';
import { OkpdService } from './okpd.service';

@Controller('api/okpd')
export class OkpdController {
  constructor(private readonly okpdServise: OkpdService) {}

  @Get('getAll')
  async getAll(): Promise<RecordEntity[]> {
    return await this.okpdServise.getAll();
  }
}
