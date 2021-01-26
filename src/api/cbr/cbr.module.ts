import { Injectable, Module } from '@nestjs/common';
import { CbrController } from './cbr.controller';
import { CbrService } from './cbr.service';
import { IResponse, IDate } from '../api.module';

@Module({
  controllers: [CbrController],
  providers: [CbrService],
})
export class CbrModule {
  public readonly wsdl =
    'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL';
  public readonly xml = [
    '<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://web.cbr.ru/"><soapenv:Header/><soapenv:Body><web:KeyRateXML><web:fromDate>',
    '</web:fromDate><web:ToDate>',
    '</web:ToDate></web:KeyRateXML></soapenv:Body> </soapenv:Envelope>',
  ];
  public SoapClient;
}

@Injectable()
export class response implements IResponse {
  public value: number;
  public statusCode: number;
  public message?: string;
  constructor() {
    this.value = 1;
    this.statusCode = 400;
  }
}

@Injectable()
export class dateYMD implements IDate {
  public day: number;
  public month: number;
  public year: number;
  constructor(str: string) {
    this.year = +str.slice(0, 4);
    this.month = +str.slice(5, 7);
    this.day = +str.slice(8, 11);
  }
  public isMoreOrEqual(another: dateYMD | string): boolean {
    if (typeof another === 'string') another = new dateYMD(another);
    if (this.year >= another.year)
      if (this.month >= another.month)
        if (this.day >= another.day)
          return true;
    return false;
  }
  public isLessOrEqual(another: dateYMD | string): boolean {
    if (typeof another === 'string') another = new dateYMD(another);
    if (this.year <= another.year)
      if (this.month <= another.month)
        if (this.day <= another.day)
          return true;
    return false;
  }
  static dateNow(): dateYMD {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return new dateYMD(yyyy + '-' + mm + '-' + dd);
  }
}
