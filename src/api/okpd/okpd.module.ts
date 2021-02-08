import { Module } from '@nestjs/common';
import { OkpdService } from './okpd.service';
import { OkpdController } from './okpd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './database/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [OkpdService],
  controllers: [OkpdController]
})
export class OkpdModule {}
