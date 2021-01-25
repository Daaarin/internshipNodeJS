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
  public readonly xml = `<?xml version="1.0" encoding="utf-8"?>
      <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <MainInfoXML xmlns="http://web.cbr.ru/" />
      </soap12:Body>
      </soap12:Envelope>`
  public SoapClient
  public response = new response()
}

@Injectable()
export class response implements IResponse {
  public value: number
  public statusCode: number
  public message?: string
}
