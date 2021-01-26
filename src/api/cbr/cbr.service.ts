import { Injectable } from '@nestjs/common'
import { IResponse } from '../api.module'
import { CbrModule } from './cbr.module'
import soap = require('soap')
import jq = require('jquery.soap')
import JQuery = require('jquery')
import XMLHttpRequest = require('xmlhttprequest')

@Injectable()
export class CbrService {
  async getRate(date): Promise<any> /*<IResponse>*/ {
    const Module = new CbrModule()
    Module.response.statusCode = 400
    Module.response.message =
      'Что-то пошло не так, сервис сейчас недоступун - попробуйте позже'
    /*const Headers = {
      Host: 'www.cbr.ru',
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'http://web.cbr.ru/MainInfoXML',
    }*/
    //
    //
    /*let xml: string
    for (let i = 0; i < Module.xml.length; i++) {
      xml += Module.xml[i]
      if (i !== 2) {
        xml += date
      }
    }
    const xhr = new XMLHttpRequest.XMLHttpRequest()
    xhr.open('POST', Module.url)
    xhr.setRequestHeader('Content-Type', 'application/soap+xml')
    await xhr.send(xml)
    const response = xhr.response
    console.log(response)*/
    //
    //
    /*$.soap({
      url: Module.url,
      method: 'KeyRateXML',
      data: {
        fromDate: date,
        toDate: date,
      },
      success: (soapResponse) => {
        console.log(soapResponse.toJSON())
      },
      error: () => {
        return Module.response
      },
    })*/
    //
    //
    /*Module.SoapClient = soap.createClient(Module.wsdl, (err, client) => {
      if (err) {
        return Module.response
      }
      client['KeyRateXML'](date, date).then((result) => {
        Module.response.value = result
      })
      if (Module.response.value) {
        Module.response.statusCode = 200
        delete Module.response.message
      }
    })*/
    //
    //
    soap.createClient(Module.wsdl, function (err, client) {
      client['KeyRate'](
        { fromDate: '2019-01-01', ToDate: '2019-01-02' },
        function (err, result) {
          if (err) console.log(err)
          else console.dirxml(result)
        },
      )
    })

    Module.response.value = 0
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
  sayHi(): string {
    return 'Hey-yo'
  }
}
