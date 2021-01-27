import { Injectable } from '@nestjs/common'
import { response, dateYMD } from './cbr.module'
import soap = require('soap')
import { IResponse } from '../api.module'

@Injectable()
export class CbrService {
  static wsdl = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL'
  async getRate(inputDate): Promise<IResponse> {
    const outputResponse = new response()
    let date = new dateYMD(inputDate)
    const dateToday = dateYMD.dateNow()
    if (date.isLessOrEqual('2013-09-16')) {
      outputResponse.statusCode = 400
      outputResponse.message = 'Нет данных за данное число и более ранние даты'
      return outputResponse
    }
    if (date.isMoreOrEqual(dateToday)) date = dateToday
    console.log('By ', date)
    let flag = false // checks whether cbr server sent a value
    await soap
      .createClientAsync(CbrService.wsdl)
      .then((client) => {
        return client.KeyRateXMLAsync({ fromDate: date, ToDate: date })
      })
      .then((result) => {
        //for (let key of result) console.log(key)
        console.log('Result from cbr: ', result.KeyRateXMLResult)
        const err = async (undefinedField?) => {
          outputResponse.message = 'Сервис ЦБР не дал ответ, попробуйте позже'
          outputResponse.statusCode = 400
          console.log('Error message: ', outputResponse.message)
          if (!undefinedField) console.log("There's no result")
          else console.log("There's no ", undefinedField)
        }
        switch (undefined) {
          case result: {
            err()
            return
          }
          case result.KeyRateXMLResult: {
            err(result)
            return
          }
          case result.KeyRateXMLResult.KeyRate: {
            err(result.KeyRateXMLResult)
            return
          }
          case result.KeyRateXMLResult.KeyRate.KR: {
            err(result.KeyRateXMLResult.KeyRate)
            return
          }
          case result.KeyRateXMLResult.KeyRate.KR.Rate: {
            err(result.KeyRateXMLResult.KeyRate.KR)
            return
          }
        }
        /*if (
          !result ||
          !result.KeyRateXMLResult ||
          !result.KeyRateXMLResult.KeyRate ||
          //result.KeyRateXMLResult.KeyRate.Error ||
          !result.KeyRateXMLResult.KeyRate.KR ||
          !result.KeyRateXMLResult.KeyRate.KR.Rate
        ) {
          outputResponse.message = 'Сервис ЦБР не дал ответ, попробуйте позже'
          outputResponse.statusCode = 400
          console.log('Error message: ', outputResponse.message)
          return
        }*/
        //console.log(result.KeyRateXMLResult);
        outputResponse.value = result.KeyRateXMLResult.KeyRate.KR.Rate
        console.log('Gotten value: ', outputResponse.value)
        flag = true
        if (flag && outputResponse.value) outputResponse.statusCode = 200
        return
      })
    console.log('Response: ', outputResponse)
    return outputResponse
  }
  sayHi(): string {
    return `Hey-yo, input string type of "yyyy-mm-dd" and u'll get the key rate at that day`
  }
}
