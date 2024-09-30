import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { CreateOrderService } from '../domain/use_case/CreateOrder.service';


@Controller('/orders')
export default class OrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Get()
  async getOrders() {
    return 'All orders'; 
  }

  @Post('/create')
  async createOrder(@Body() body: any): Promise<string> {
    return this.createOrderService.createOrder(body);
  }
}
