import { Controller, Get, Post, Body, Inject, Patch, Param } from '@nestjs/common';
import { CreateOrderService } from '../domain/use_case/CreateOrder.service';
import { PayOrderService } from '../domain/use_case/PayOrder.service';


@Controller('/orders')
export default class OrderController {
  constructor(private readonly payOrderService: PayOrderService,private readonly createOrderService: CreateOrderService) {}

  @Get()
  async getOrders() {
    return 'All orders'; 
  }

  @Post('/create')
  async createOrder(@Body() body: any): Promise<string> {
    return this.createOrderService.createOrder(body);
  }

  @Patch(':orderId/pay')
  async payOrder(@Param('orderId') orderId: string) {
    return this.payOrderService.payOrder(orderId);
  }
}
