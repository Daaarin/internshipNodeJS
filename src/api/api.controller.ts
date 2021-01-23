import { Controller, Get, Param } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  getAll(): string {
    return 'Hi, are u looking for the other side?';
  }
  @Get('health')
  getHealthResponse() {
    const response = {
      status: 'ok',
      serverTime: Date.now(),
    };
    return JSON.stringify(response);
  }
  @Get('cbr/:id')
  async getRate(@Param('id') params): Promise<{ value: number }> {
    const url = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx';
    const sampleHeaders = {
      Host: 'www.cbr.ru',
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: 'http://web.cbr.ru/MainInfoXML',
    };
    const xml = `<?xml version="1.0" encoding="utf-8"?>
      <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <MainInfoXML xmlns="http://web.cbr.ru/" />
      </soap12:Body>
      </soap12:Envelope>`;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const soapRequest = require('easy-soap-request');
    const { response } = await soapRequest({
      url: url,
      headers: sampleHeaders,
      xml: xml,
    });
    const { headers, body, statusCode } = response;
    const respBody = response.body;
    // console.log(respBody);
    const keyRateIndex = respBody.indexOf('keyRate') + 50;
    // console.log(respBody[keyRateIndex]);
    // console.log(parseFloat(respBody.slice(keyRateIndex, keyRateIndex + 5)));
    const keyRate: number = parseFloat(
      respBody.slice(keyRateIndex, keyRateIndex + 5),
    );
    // console.log(keyRate, typeof keyRate);
    return { value: keyRate };
  }
}
