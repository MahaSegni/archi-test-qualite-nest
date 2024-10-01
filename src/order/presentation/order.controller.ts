import { Controller, Get, Post, Body, Inject, Patch, Param } from '@nestjs/common';
import { CreateOrderService } from '../domain/use_case/CreateOrder.service';
import { PayOrderService } from '../domain/use_case/PayOrder.service';
import { DeliveryService } from '../domain/use_case/Delivery.service';


@Controller('/orders')
export default class OrderController {
  constructor(private readonly payOrderService: PayOrderService,private readonly createOrderService: CreateOrderService, private readonly deliveryService: DeliveryService) {}

  @Get()
  async getOrders() {
    return 'All orders'; 
  }

  @Post('/create')
  async createOrder(@Body() body: any): Promise<string> {
    return this.createOrderService.createOrder(body);
  }


  @Post(':orderId/pay')
  async payOrder(@Param('orderId') orderId: string) {
    return this.payOrderService.payOrder(orderId);
  }

  @Post(':id/delivery')
  async updateShippingAddress(
    @Param('id') orderId: string,
    @Body('shippingAddress') newAddress: string
  ) {
    return this.deliveryService.addDelivery(orderId, newAddress);
  }
}
