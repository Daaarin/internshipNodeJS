import { Module } from '@nestjs/common';
import { OkpdService } from './okpd.service';
import { OkpdController } from './okpd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Okpd2Codes } from './database/entities/okpd2codes.entity';
import { Attributes44FZ } from './database/entities/attributes44FZ.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Okpd2Codes, Attributes44FZ])],
  providers: [OkpdService],
  controllers: [OkpdController]
})
export class OkpdModule {}
