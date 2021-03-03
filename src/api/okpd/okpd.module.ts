import { Module } from '@nestjs/common';
import { OkpdService } from './okpd.service';
import { OkpdController } from './okpd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './database/entities/product.entity';
import { Okpd2Codes } from './database/entities/okpd2codes.entity';
import { Okpd2Codes_Attributes44FZ } from './database/entities/okpd2Codes_Attributes44FZ.entity';
import { Attributes44FZ } from './database/entities/attributes44FZ.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Okpd2Codes,
      Okpd2Codes_Attributes44FZ,
      Attributes44FZ
    ])
  ],
  providers: [OkpdService],
  controllers: [OkpdController]
})
export class OkpdModule {}
