import { Injectable, BadRequestException } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import OrderRepository from 'src/order/infrastructure/order.repository';

export class SetInvoiceAddressService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string, invoiceAddress: string | null): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order.shippingAddress) {
      throw new BadRequestException('Shipping address must be set before invoice address.');
    }

    order.invoiceAddress = invoiceAddress || order.shippingAddress;

    await this.orderRepository.save(order);
    return order;
  }
}
