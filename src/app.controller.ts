import { AppService } from './app.service';
import { GenerateOrderPdfService } from './order/application/use_case/generate-order-pdf.service';
import { Controller, Get} from '@nestjs/common';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('hello')
  // getHelloAgain(): string {
  //   return this.appService.getHelloAgain();
  // }
  
}
