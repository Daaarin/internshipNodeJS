import { Injectable } from '@nestjs/common';
import { CbrModule, response, dateYMD } from './cbr.module';
import soap = require('soap');
import { IResponse } from '../api.module';

@Injectable()
export class CbrService {
  async getRate(inputDate): Promise<IResponse> {
    const myResp = new response(); // myResp = {value: 0, code: 0}
    let date = new dateYMD(inputDate);
    //console.log(date);
    const dateToday = dateYMD.dateNow();
    //console.log(date.isMoreOrEqual(dateYMD.dateNow()));
    if (date.isLessOrEqual('2013-09-16')) {
      myResp.statusCode = 200;
      myResp.message = 'Нет данных за данное число и более ранние даты';
      return myResp;
    }
    if (date.isMoreOrEqual(dateYMD.dateNow())) date = dateYMD.dateNow();
    console.log(date);
    const Module = new CbrModule();
    let flag = false;
    soap.createClient(Module.wsdl, (err, client) => {
      client.KeyRateXML({ fromDate: date, ToDate: date }, (err, result) => {
        if (err) {
          myResp.message =
            'Что-то пошло не так, сервис сейчас недоступун - попробуйте позже';
        } else {
          //console.log(result.KeyRateXMLResult);
          if (
            !result ||
            !result.KeyRateXMLResult ||
            !result.KeyRateXMLResult.KeyRate ||
            !result.KeyRateXMLResult.KeyRate.KR ||
            !result.KeyRateXMLResult.KeyRate.KR.Rate
          ) {
            myResp.message = 'Сервис ЦБР не дал ответ, попробуйте позже';
            console.log(myResp.message);
            return myResp;
          }
          //console.log(result.KeyRateXMLResult);
          myResp.value = result.KeyRateXMLResult.KeyRate.KR.Rate;
          console.log(myResp.value);
          flag = true;
        }
        if (flag) {
          myResp.statusCode = 200;
        }
        console.log(myResp); // здесь myResp = {value: x.xx, code: 200} если всё успешно прошло
        return myResp;
      });
    });
    return myResp; // здесь myResp = {value: 0, code: 0}
  }
  sayHi(): string {
    return `Hey-yo, input string type of "yyyy-mm-dd" and u'll get the key rate at that day`;
  }
}
