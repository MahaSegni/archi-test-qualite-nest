import { Injectable } from '@nestjs/common';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';
import { PdfGenerator } from '../../infrastructure/pdf-generator';

@Injectable()
export class GenerateOrderPdfService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly pdfGeneratorService: PdfGenerator,
  ) {}

  async execute(orderId: string): Promise<Buffer> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    const orderDetails = order.getOrderDetailsForPdf();
    return await this.pdfGeneratorService.generateOrderPdf(orderDetails.id, orderDetails.items);
  }
}
