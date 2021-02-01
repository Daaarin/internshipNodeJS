import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { response } from './cbr.module';
import soap = require('soap');
import moment = require('moment');
import { IResponse } from '../api.module';
import { Response } from 'express';

@Injectable()
export class CbrService {
  static wsdl = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL';

  async getRate(inputDate: string, res: Response): Promise<IResponse> {
    const outputResponse = new response();
    if (moment(inputDate).isValid()) {
      console.log(
        `Date (${inputDate}) is valid: ${moment(inputDate)} ${moment(
          inputDate
        ).isValid()}`
      );
      inputDate = moment(inputDate).format('YYYY-MM-DD');
      console.log('Format: YYYY-MM-DD', inputDate);
    } else if (moment(inputDate, 'MM-DD-YYYY').isValid()) {
      inputDate = moment(inputDate, 'MM-DD-YYYY').format('YYYY-MM-DD');
      console.log('Format: MM-DD-YYYY', inputDate);
    } else if (moment(inputDate, 'YYYY-DD-MM').isValid()) {
      inputDate = moment(inputDate, 'YYYY-DD-MM').format('YYYY-MM-DD');
      console.log('Format: YYYY-DD-MM', inputDate);
    } else if (moment(inputDate, 'DD-MM-YYYY').isValid()) {
      inputDate = moment(inputDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
      console.log('Format: DD-MM-YYYY', inputDate);
    } else {
      console.log('Date: ', moment(inputDate));
      outputResponse.message =
        "Неправильный вид даты - должен быть в формате ISO или вида 'ГГГГ-ММ-ДД' либо 'ДД-ММ-ГГГГ', например, '2017-01-15' или '25-03-2015'";
      return res.status(400).send({
        message: outputResponse.message,
      });
    }
    console.log(moment(inputDate));
    let flag = false; // checks whether cbr server sent a value
    await soap
      .createClientAsync(CbrService.wsdl)
      .then((client) => {
        return client.KeyRateXMLAsync({
          fromDate: inputDate,
          ToDate: inputDate,
        });
      })
      .then((result) => {
        //result = [0:envelope, 1:error, 2:schema or headers]
        console.log('result[0] from cbr: ', result[0].KeyRateXMLResult);
        if (!result[0] || !result[1]) {
          outputResponse.message = 'Сервис ЦБР недоступен, попробуйте позже';
          outputResponse.statusCode = 400;
          console.log('Error message: ', outputResponse.message);
          return;
        }
        if (
          !result[0].KeyRateXMLResult ||
          !result[0].KeyRateXMLResult.KeyRate ||
          !result[0].KeyRateXMLResult.KeyRate.KR ||
          !result[0].KeyRateXMLResult.KeyRate.KR.Rate
        ) {
          outputResponse.message =
            'Сервис ЦБР не дал ответ, попробуйте позже или другую дату';
          outputResponse.statusCode = 200; // правильнее было бы 204, но тогда сообщение не передаётся
          outputResponse.value = 0;
          console.log('Warning message: ', outputResponse.message);
          return;
        }
        outputResponse.value = result[0].KeyRateXMLResult.KeyRate.KR.Rate;
        console.log('Gotten value: ', outputResponse.value);
        flag = true;
        if (flag && outputResponse.value) outputResponse.statusCode = 200;
        else {
          outputResponse.statusCode = 404;
          outputResponse.message =
            'Сервис ЦБР не дал ответ, попробуйте позже или другую дату';
        }
        return;
      });
    console.log('Response: ', outputResponse);
    return res.status(outputResponse.statusCode).send({
      message: outputResponse.message,
      value: outputResponse.value,
    });
  }

  sayHi(): string {
    return `Hey-yo, input string type of "yyyy-mm-dd" and u'll get the key rate at that day`;
  }
}
