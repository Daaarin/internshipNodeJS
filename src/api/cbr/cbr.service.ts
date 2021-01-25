import { Injectable, Param } from '@nestjs/common'
import { IResponse } from '../api.module'
import { CbrModule } from './cbr.module'
import soap = require('soap')

@Injectable()
export class CbrService {
  async getRate(@Param('date') params): Promise<IResponse> {
    const Module = new CbrModule()
    /*const Headers = {
      Host: 'www.cbr.ru',
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'http://web.cbr.ru/MainInfoXML',
    }*/
    Module.SoapClient = soap.createClient(Module.wsdl, (err, client) => {
      if (!err) {
        Module.response.value = client.keyRateXML(params.date, params.date)
      }
    })
    if (!Module.response.value) {
      Module.response.statusCode = 400
      Module.response.message =
        'Что-то пошло не так, сервис сейчас недоступун - попробуйте позже'
    }
    return Module.response
    /*const { response } = await soapRequest({
      url: Module.url,
      headers: Headers,
      xml: Module.xml,
    })
    const { headers, body, statusCode } = response
    const respBody = response.body
    // console.log(respBody);
    const keyRateIndex = respBody.indexOf('keyRate') + 50
    // console.log(respBody[keyRateIndex]);
    // console.log(parseFloat(respBody.slice(keyRateIndex, keyRateIndex + 5)));
    const keyRate: number = parseFloat(
      respBody.slice(keyRateIndex, keyRateIndex + 5),
    )
    // console.log(keyRate, typeof keyRate);*/
  }
}
