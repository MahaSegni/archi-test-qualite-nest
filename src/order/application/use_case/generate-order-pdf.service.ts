import { Injectable } from '@nestjs/common';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';
import { PdfGeneratorService } from '../../infrastructure/pdf-generator.service';

@Injectable()
export class GenerateOrderPdfService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  async execute(orderId: string): Promise<Buffer> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    // Vérification si la commande a été payée
    if (!order.isValid()) {
      throw new Error('Cannot generate invoice for an unpaid order');
    }

    const orderDetails = order.getOrderDetailsForPdf();
    return await this.pdfGeneratorService.generateOrderPdf(orderDetails.id, orderDetails.items);
  }
}
