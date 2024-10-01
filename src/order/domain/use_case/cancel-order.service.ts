import { Injectable, BadRequestException } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import OrderRepository from 'src/order/infrastructure/order.repository';


export class CancelOrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string, cancelReason: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (order.status === 'SHIPPED') {
      throw new BadRequestException('Cannot cancel an order that has already been shipped.');
    }

    order.cancelAt = new Date();
    order.canceledReason = cancelReason;

    order.status = 'CANCELED';
    await this.orderRepository.save(order);
    return order;
  }
}
