import { Controller, Get, Param } from "@nestjs/common";

@Controller('cbr')
export class CbrController {
  @Get()
  getAnyResponse() {
    return "I'm working";
  }
  @Get(':id')
  getKeyRate(@Param('id') param) {
    return 5;
    //const id = params.id;
    //request
    //handling response
  }
}
