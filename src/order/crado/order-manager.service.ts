import { Injectable } from '@nestjs/common';
import { EmailService } from './email-service';
import { SmsService } from './sms-service';
import OrderRepository from '../infrastructure/order.repository';

@Injectable()
export class OrderManagerService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
  ) {}

  async processOrder(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);
    if (!order.isValid()) {
        throw new Error('Order validation failed');
      }
   
    await this.emailService.sendOrderConfirmation(order);
    await this.smsService.sendOrderConfirmation(order);

    await this.orderRepository.save(order);
  }
}
