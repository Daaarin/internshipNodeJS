import { Module } from '@nestjs/common';
import { CbrController } from './cbr/cbr.controller';
import { AppService } from '../app.service';

@Module({
  controllers: [CbrController],
})
export class ApiModule {}
