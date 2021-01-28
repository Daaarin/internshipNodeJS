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
        return client.KeyRateXMLAsync({
          fromDate: inputDate,
          ToDate: inputDate,
        })
      })
      .then((result) => {
        //for (let key of result[0]) console.log(key)
        console.log('result[0] from cbr: ', result[0].KeyRateXMLResult)
        if (
          !result[0] ||
          !result[0].KeyRateXMLResult ||
          !result[0].KeyRateXMLResult.KeyRate ||
          !result[0].KeyRateXMLResult.KeyRate.KR ||
          !result[0].KeyRateXMLResult.KeyRate.KR.Rate
        ) {
          outputResponse.message =
            'Сервис ЦБР не дал ответ, попробуйте позже или другую дату'
          outputResponse.statusCode = 400
          console.log('Error message: ', outputResponse.message)
          return
        }
        outputResponse.value = result[0].KeyRateXMLResult.KeyRate.KR.Rate
        console.log('Gotten value: ', outputResponse.value)
        flag = true
        if (flag && outputResponse.value) outputResponse.statusCode = 200
        else {
          outputResponse.statusCode = 400
          outputResponse.message =
            'Сервис ЦБР не дал ответ, попробуйте позже или другую дату'
        }
        return
      })
    console.log('Response: ', outputResponse)
    return outputResponse
  }
  sayHi(): string {
    return `Hey-yo, input string type of "yyyy-mm-dd" and u'll get the key rate at that day`
  }
}
