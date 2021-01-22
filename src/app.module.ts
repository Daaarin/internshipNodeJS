import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { CbrController } from './api/cbr/cbr.controller';

@Module({
  imports: [],
  controllers: [AppController, ApiController, CbrController],
  providers: [AppService],
})
export class AppModule {}
