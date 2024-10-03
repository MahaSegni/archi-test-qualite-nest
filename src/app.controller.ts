import { AppService } from './app.service';
import { GenerateOrderPdfService } from './order/application/use_case/generate-order-pdf.service';
import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly generateOrderPdfService: GenerateOrderPdfService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('hello')
  // getHelloAgain(): string {
  //   return this.appService.getHelloAgain();
  // }
  @Get(':id/invoice')
  async generateInvoice(@Param('id') orderId: string, @Res() res: Response) {
    try {
      const pdfBuffer = await this.generateOrderPdfService.execute(orderId);

      // Envoyer le PDF en réponse
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=order_${orderId}.pdf`,
      });

      res.send(pdfBuffer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
