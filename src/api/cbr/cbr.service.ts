import { Injectable } from '@nestjs/common';
import { CbrModule, response } from './cbr.module';
import soap = require('soap');
import { IResponse } from '../api.module';

@Injectable()
export class CbrService {
  async getRate(date): Promise<IResponse> {
    const Module = new CbrModule();
    const myResp = new response();
    let flag = false;
    soap.createClient(Module.wsdl, function (err, client) {
      client.KeyRateXML(
        { fromDate: date, ToDate: date },
        function (err, result) {
          if (err) {
            myResp.statusCode = 400;
            myResp.message =
              'Что-то пошло не так, сервис сейчас недоступун - попробуйте позже';
          } else {
            // console.log(result.KeyRateXMLResult);
            myResp.value = result.KeyRateXMLResult.KeyRate.KR.Rate;
            //console.log(myResp.value);
            flag = true;
          }
          if (flag) {
            myResp.statusCode = 200;
            delete myResp.message;
          }
          console.log(myResp);
        },
      );
    });
    return myResp;
  }
  sayHi(): string {
    return 'Hey-yo';
  }
}
