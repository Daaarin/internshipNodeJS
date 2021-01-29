import { Injectable } from '@nestjs/common'
import { response, dateYMD } from './cbr.module'
import soap = require('soap')
import moment = require('moment')
import { IResponse } from '../api.module'

@Injectable()
export class CbrService {
  static wsdl = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL'
  async getRate(inputDate): Promise<IResponse> {
    const outputResponse = new response()
    /*console.log(moment(inputDate).format('YYYY-MM-DD'))
    console.log(moment(inputDate).format('DD-MM-YYYY'))
    console.log(moment(inputDate).format('YYYY-DD-MM'))
    console.log(moment(inputDate).format('MM-DD-YYYY'))*/
    /*switch (true) {
      case moment(inputDate).isValid():
        inputDate = moment(inputDate).format('YYYY-MM-DD')
        console.log('#1 taken:', inputDate)
        break
      case moment(inputDate, ['YYYY-DD-MM', 'MM-DD-YYYY']).isValid():
        console.log('#2 taken', inputDate)
        outputResponse.message =
          "Неправильный вид даты - должен быть вида 'ГГГГ-ММ-ДД', например, '2017-01-15'"
        outputResponse.statusCode = 400
        console.log(outputResponse)
        return outputResponse
      default: {
        outputResponse.message =
          "Неправильный вид даты - должен быть вида 'ГГГГ-ММ-ДД', например, '2017-01-15'"
        outputResponse.statusCode = 400
        console.log('Date: ', moment(inputDate))
        console.log(outputResponse)
        return outputResponse
      }
    }*/
    if (moment(inputDate).isValid()) {
      console.log(
        `Date (${inputDate}) is valid: ${moment(inputDate)} ${moment(
          inputDate,
        ).isValid()}`,
      )
      inputDate = moment(inputDate).format('YYYY-MM-DD')
      console.log('Format: YYYY-MM-DD', inputDate)
    } else if (moment(inputDate, 'MM-DD-YYYY').isValid()) {
      inputDate = moment(inputDate, 'MM-DD-YYYY').format('YYYY-MM-DD')
      console.log('Format: MM-DD-YYYY', inputDate)
      //inputDate = moment(inputDate).format("YYYY-MM-DD");
    } else if (moment(inputDate, 'YYYY-DD-MM').isValid()) {
      inputDate = moment(inputDate, 'YYYY-DD-MM').format('YYYY-MM-DD')
      console.log('Format: YYYY-DD-MM', inputDate)
    } else if (moment(inputDate, 'DD-MM-YYYY').isValid()) {
      inputDate = moment(inputDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
      console.log('Format: DD-MM-YYYY', inputDate)
    } else {
      console.log('Date: ', moment(inputDate))
      outputResponse.message =
        "Неправильный вид даты - должен быть в формате ISO или вида 'ГГГГ-ММ-ДД' либо 'ДД-ММ-ГГГГ', например, '2017-01-15' или '25-03-2015'"
      outputResponse.statusCode = 400
      return outputResponse
    }
    console.log(moment(inputDate))
    /*if (moment(inputDate).isValid()) {
      inputDate = moment(inputDate).format('YYYY-MM-DD')
      console.log('#1 taken:', inputDate)
    } else if (moment(inputDate, ['YYYY-DD-MM', 'MM-DD-YYYY']).isValid()) {
      console.log('#2 taken', inputDate)
      outputResponse.message =
        "Неправильный вид даты - должен быть вида 'ГГГГ-ММ-ДД' либо 'ММ-ДД-ГГГГ', например, '2017-01-15' или '03-25-2015'"
      outputResponse.statusCode = 400
      console.log(outputResponse)
      return outputResponse
    } else if (moment(inputDate, 'DD-MM-YYYY').isValid()) {
      console.log('#3 taken', inputDate)
      inputDate = moment(inputDate, "DD-MM-YYYY")
      inputDate = moment(inputDate).format("YYYY-DD-MM")
    } else {
      outputResponse.message =
        "Неправильный вид даты - должен быть вида 'ГГГГ-ММ-ДД', например, '2017-01-15'"
      outputResponse.statusCode = 400
      console.log('Date: ', moment(inputDate))
      console.log(outputResponse)
      return outputResponse
    }*/
    /*let date = new dateYMD(inputDate)
    const dateToday = dateYMD.dateNow()
    if (date.isLessOrEqual('2013-09-16')) {
      outputResponse.statusCode = 400
      outputResponse.message = 'Нет данных за данное число и более ранние даты'
      return outputResponse
    }
    if (date.isMoreOrEqual(dateToday)) date = dateToday
    console.log('By ', date)*/
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
        //result = [0:envelope, 1:error, 2:schema or headers]
        //for (let key of result[0]) console.log(key)
        console.log('result[0] from cbr: ', result[0].KeyRateXMLResult)
        if (!result[0] || !result[1]) {
          outputResponse.message = 'Сервис ЦБР недоступен, попробуйте позже'
          outputResponse.statusCode = 400
          console.log('Error message: ', outputResponse.message)
          return
        }
        if (
          !result[0].KeyRateXMLResult ||
          !result[0].KeyRateXMLResult.KeyRate ||
          !result[0].KeyRateXMLResult.KeyRate.KR ||
          !result[0].KeyRateXMLResult.KeyRate.KR.Rate
        ) {
          outputResponse.message =
            'Сервис ЦБР не дал ответ, попробуйте позже или другую дату'
          outputResponse.statusCode = 200
          outputResponse.value = 0
          console.log('Warning message: ', outputResponse.message)
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
