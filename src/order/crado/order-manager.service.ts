import { Injectable } from '@nestjs/common';
import { OrderValidationService } from './order-validation.service';
import { EmailService } from './email-service';
import { SmsService } from './sms-service';
import OrderRepository from '../infrastructure/order.repository';

@Injectable()
export class OrderManagerService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderValidationService: OrderValidationService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
  ) {}

  async processOrder(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);

    this.orderValidationService.validate(order);

   // await this.emailService.sendOrderConfirmation(order);
   // await this.smsService.sendOrderConfirmation(order);

    await this.orderRepository.save(order);
  }
}
