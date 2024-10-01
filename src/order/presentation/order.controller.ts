import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Order } from 'src/order/domain/entity/order.entity';
import { PayOrderService } from '../domain/use_case/pay-order.service';
import { CreateOrderCommand, CreateOrderService } from '../domain/use_case/create-order.service';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderCommand: CreateOrderCommand,
  ): Promise<string> {
    return this.createOrderService.createOrder(createOrderCommand);
  }

  @Post()
  async payOrder(@Param('id') id: string): Promise<Order> {
    return await this.payOrderService.execute(id);
  }
}