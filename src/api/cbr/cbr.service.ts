import { Injectable } from '@nestjs/common';
import { CbrModule, response } from './cbr.module';
import soap = require('soap');
import { IResponse } from '../api.module';

@Injectable()
export class CbrService {
  async getRate(date): Promise<IResponse> {
    const Module = new CbrModule();
    //let myResp = new response(); // myResp = {value: 0, code: 0}
    let flag = false;
    let myResp = {
      value: 1,
      statusCode: 400,
      message: '',
    };
    const res = (err, result) => {
      if (err) {
        myResp.message =
          'Что-то пошло не так, сервис сейчас недоступун - попробуйте позже';
      } else {
        if (
          result ||
          result.KeyRateXMLResult ||
          result.KeyRateXMLResult.KeyRate ||
          result.KeyRateXMLResult.KeyRate.KR ||
          result.KeyRateXMLResult.KeyRate.KR.Rate
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
    };
    const keyRateXML = (err, client) => {
      return;
    };
    const returnResp = (resp) => {
      soap.createClient(Module.wsdl, (err, client) => {
        client.KeyRateXML({ fromDate: date, ToDate: date }, (err, result) => {
          if (err) {
            myResp.message =
              'Что-то пошло не так, сервис сейчас недоступун - попробуйте позже';
          } else {
            console.log(result.KeyRateXMLResult);
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
      return resp;
    };
    myResp = returnResp(myResp);
    let resp = new response();
    resp = myResp;
    return myResp; // здесь myResp = {value: 0, code: 0}
  }
  sayHi(): string {
    return 'Hey-yo';
  }
}
