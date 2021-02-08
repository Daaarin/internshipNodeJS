import { Controller, Get, Res } from '@nestjs/common';
import { Product } from './database/entities/product.entity';
import { OkpdService } from './okpd.service';

@Controller('api/okpd')
export class OkpdController {
  constructor(private readonly okpdServise: OkpdService) {}

  @Get('getAll')
  async getAll(@Res() res): Promise<Product[]> {
    const data = await this.okpdServise.getAll();
    const outputResponse = {
      data: [],
      errorMessage: '',
      statusCode: 0
    };
    if (!data.length) {
      outputResponse.errorMessage = `Couldn't get access to database`;
      outputResponse.statusCode = 500;
      delete outputResponse.data;
    } else {
      outputResponse.data = data;
      outputResponse.statusCode = 200;
      delete outputResponse.errorMessage;
    }
    return await res.send({
      data: outputResponse.data,
      statusCode: outputResponse.statusCode,
      errorMessage: outputResponse.errorMessage
    });
  }
}
