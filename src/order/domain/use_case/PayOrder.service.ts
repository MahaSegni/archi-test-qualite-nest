import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';

@Injectable()
export class PayOrderService {
    constructor(
      @Inject('OrderRepositoryInterface') 
      private readonly orderRepository: OrderRepositoryInterface,
    ) {}

  private async getMock(orderId: string): Promise<Order> {
    const mock: Order = {
      id: orderId,
      customerName: 'test',
      shippingAddress: '123 test',
      invoiceAddress: '123 test',
      orderItems: [],
      price: 20,
      status: 'Pending',
      createdAt: new Date(),
      paidAt: null,
      shippingAddressSetAt: null,
    } as Order;

    return mock;
  }

  async payOrder(orderId: string) {
    const order = await this.getMock(orderId);

    if (!order) {
      throw new NotFoundException(`Order not found`);
    }

    if (order.paidAt) {
      throw new BadRequestException('Already been paid');
    }

    order.paidAt = new Date();
    order.status = 'Paid';

    return order;
  }
}
