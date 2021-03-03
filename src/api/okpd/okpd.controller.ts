import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Product } from './database/entities/product.entity';
import { OkpdService } from './okpd.service';
import needle = require('needle');
import cheerio = require('cheerio');

@Controller('api/okpd')
export class OkpdController {
  constructor(private readonly okpdServise: OkpdService) {}

  /*@Get('getAll')
  async getAll(@Res() res): Promise<Product[]> {
    const data = await this.okpdServise.getAll();
    const outputResponse = {
      data: [],
      errorMessage: '',
      statusCode: 0
    };
    if (!data.length) {
      outputResponse.errorMessage = "Couldn't get access to database";
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
  }*/
  @Post('getData')
  async getData(@Body() input, @Res() res): Promise<any> {
    const outputResponse = {
      statusCode: 0,
      errorMessage: '',
      data: []
    };
    /*const goods = {
      data: {
        code: '',
        ktru: '',
        '471r': false,
        '616': false,
        '1236': false,
        '617': false,
        '878': false,
        '832': false,
        st28: false,
        st29: false,
        '126N': false,
        '174B': false,
        '1289': false,
        '102': false,
        '2014': false,
        '1221': false,
        '1292': false
      },
      errorMessage: ''
    };*/
    for (const code of input.codes) {
      await needle(
        'get',
        `https://zakupki.gov.ru/epz/ktru/search/results.html?searchString=${code}`
      )
        .then((res) => {
          const $ = cheerio.load(res.body);
          const target = $('.registry-entry__header-mid__number a');
          const good = {
            code: code,
            ktru: true
          };
          if ($('.noRecords').text() == 'Поиск не дал результатов') {
            good.ktru = false;
          }
          outputResponse.data.push(good);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    //console.log(outputResponse.data);
    if (outputResponse.data.length) {
      outputResponse.statusCode = 200;
    } else {
      outputResponse.statusCode = 400;
    }
    return await res.send({
      data: outputResponse.data,
      statusCode: outputResponse.statusCode,
      errorMessage: outputResponse.errorMessage
    });
  }
  @Get('getAllData')
  async getAllData(@Res() res) {
    const data = await this.okpdServise.getAllData();
    console.log('Data from db: ', data);
    const outputResponse = {
      data: [],
      errorMessage: '',
      statusCode: 0
    };
    if (!data.length) {
      outputResponse.errorMessage = "Couldn't get access to database";
      outputResponse.statusCode = 500;
      console.log(outputResponse.data);
      delete outputResponse.data;
    } else {
      outputResponse.data = data;
      outputResponse.statusCode = 200;
      delete outputResponse.errorMessage;
    }
    console.log(outputResponse);
    return await res.send({
      data: outputResponse.data,
      statusCode: outputResponse.statusCode,
      errorMessage: outputResponse.errorMessage
    });
  }
}
