import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { Order, OrderStatus } from '../entity/order.entity';
import { OrderRepositoryInterface } from '../port/order.repository.interface';
import { OrderItem } from '../entity/order-item.entity';

@Injectable()
export class PayOrderService {
  constructor(
    @Inject('OrderRepositoryInterface') 
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  private async getMock(orderId: string): Promise<Order> {
    const mock = new Order();
  
    mock.id = orderId;
    mock.customerName = 'test';
    mock.shippingAddress = '123 test';
    mock.invoiceAddress = '123 test';
    const item1 = new OrderItem();
  item1.productName = 'Produit A';
  item1.price = 220;

  const item2 = new OrderItem();
  item2.productName = 'Produit C';
  item2.price = 20;

  const item3 = new OrderItem();
  item3.productName = 'Produit B';
  item3.price = 300;

  mock.orderItems = [item1, item2, item3];

    mock.price = 540;
    mock.status = OrderStatus.PENDING;
    mock.createdAt = new Date();
    mock.paidAt = null;
    mock.shippingAddressSetAt = null;
  
    return mock;
  }
  

  async payOrder(orderId: string) {
    const order = await this.getMock(orderId);

    if (!order) {
      throw new NotFoundException(`Order not found`);
    }

    try {
        order.pay();
      } catch (error) {
        throw new BadRequestException(`Payment failed: ${error.message}`);
      }
   
    return "success";
  }
}
