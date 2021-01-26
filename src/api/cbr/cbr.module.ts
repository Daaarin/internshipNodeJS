import { Injectable, Module } from '@nestjs/common'
import { CbrController } from './cbr.controller'
import { CbrService } from './cbr.service'
import { IResponse } from '../api.module'

@Module({
  controllers: [CbrController],
  providers: [CbrService],
})
export class CbrModule {
  public readonly url = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx'
  public readonly wsdl = this.url + '?WSDL'
  public readonly xml = [
    '<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://web.cbr.ru/"><soapenv:Header/><soapenv:Body><web:KeyRateXML><web:fromDate>',
    '</web:fromDate><web:ToDate>',
    '</web:ToDate></web:KeyRateXML></soapenv:Body> </soapenv:Envelope>',
  ]
  public SoapClient
}

@Injectable()
export class response implements IResponse {
  public value: number
  public statusCode: number
  public message?: string
  constructor() {
    this.value = 0
    this.statusCode = 0
  }
}
