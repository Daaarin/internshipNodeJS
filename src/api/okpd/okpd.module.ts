import { Module } from '@nestjs/common';
import { OkpdService } from './okpd.service';
import { OkpdController } from './okpd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from './database/entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity])],
  providers: [OkpdService],
  controllers: [OkpdController]
})
export class OkpdModule {}
