import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OkpdModule } from './api/okpd/okpd.module';

@Module({
  imports: [
    ApiModule,
    OkpdModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/api/okpd/database/sqlite/okpd.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    })
  ],
  controllers: [AppController, ApiController],
  providers: [AppService]
})
export class AppModule {}
