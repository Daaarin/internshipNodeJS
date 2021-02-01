import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { CbrModule } from './cbr/cbr.module';
import { ApiService } from './api.service';

@Module({
  imports: [CbrModule],
  providers: [ApiService],
})
export class ApiModule {}

export interface IResponse {
  readonly value?: number;
  readonly statusCode?: number;
  readonly message?: string;
}
