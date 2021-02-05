import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { CbrModule } from './cbr/cbr.module';
import { ApiService } from './api.service';
import { OkpdModule } from './okpd/okpd.module';

@Module({
  imports: [CbrModule, OkpdModule],
  providers: [ApiService],
})
export class ApiModule {}

export interface IResponse {
  readonly value?: number;
  readonly statusCode?: number;
  readonly message?: string;
}
