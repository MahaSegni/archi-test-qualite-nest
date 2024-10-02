import {
  CreateOrderCommand,
  Order,
} from 'src/order/domain/entity/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';

export class CreateOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(createOrderCommand: CreateOrderCommand): Promise<Order> {
    const order = new Order(createOrderCommand);

    return await this.orderRepository.save(order);
  }
}