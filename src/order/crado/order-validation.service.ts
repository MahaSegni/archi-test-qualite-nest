import { Injectable } from '@nestjs/common';
import { Order } from '../domain/entity/order.entity';

@Injectable()
export class OrderValidationService {
  validate(order: Order): void {
    if (!order.isValid()) {
      throw new Error('Order validation failed');
    }
  }
}
