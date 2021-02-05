import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';
import { CbrModule } from './api/cbr/cbr.module';
import { CbrController } from './api/cbr/cbr.controller';
import { CbrService } from './api/cbr/cbr.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OkpdModule } from './api/okpd/okpd.module';

@Module({
  imports: [
    ApiModule,
    CbrModule,
    OkpdModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './api/okpd/database/sqlite/okpd.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    })
  ],
  controllers: [AppController, ApiController, CbrController],
  providers: [AppService, CbrService]
})
export class AppModule {}
