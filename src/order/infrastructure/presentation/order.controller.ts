import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderService } from 'src/order/application/use_case/create-order.service';
import { PayOrderService } from 'src/order/application/use_case/pay-order.service';
import {
  CreateOrderCommand,
  Order,
} from 'src/order/domain/entity/order.entity';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderCommand: CreateOrderCommand,
  ): Promise<Order> {
    return this.createOrderService.execute(createOrderCommand);
  }

  @Post()
  async payOrder(@Param('id') id: string): Promise<Order> {
    return await this.payOrderService.execute(id);
  }
}