import { Injectable, Module } from '@nestjs/common';
import { CbrController } from './cbr.controller';
import { CbrService } from './cbr.service';
import { IResponse } from '../api.module';

@Module({
  controllers: [CbrController],
  providers: [CbrService],
})
export class CbrModule {}

@Injectable()
export class response implements IResponse {
  public value?: number;
  public statusCode?: number;
  public message?: string;
}
