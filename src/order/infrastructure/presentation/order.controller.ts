import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderCommand, Order } from 'src/order/domain/entity/order.entity';
import { CreateOrderService } from '../../application/use_case/create-order.service';
import { PayOrderService } from '../../application/use_case/pay-order.service';
import { SetInvoiceAddressOrderService } from '../../application/use_case/set-invoice-address.service';
import { CancelOrderService } from '../../application/use_case/cancel-order.service';

@Controller('/orders')
export default class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
    private readonly setInvoiceAddressService: SetInvoiceAddressOrderService,
    private readonly cancelOrderService: CancelOrderService,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderCommand: CreateOrderCommand,
  ): Promise<Order> {
    return this.createOrderService.execute(createOrderCommand);
  }

  @Post('/:id')
  async payOrder(@Param('id') id: string): Promise<Order> {
    return await this.payOrderService.execute(id);
  }

  @Post('/:id/invoice-address')
  async setInvoiceAddress(
    @Param('id') orderId: string,
    @Body('invoiceAddress') invoiceAddress: string | null,
  ): Promise<Order> {
    return this.setInvoiceAddressService.execute(orderId, invoiceAddress);
  }

  @Post('/:id/cancel')
  async cancelOrder(
    @Param('id') orderId: string,
    @Body('reason') reason: string,
  ): Promise<Order> {
    return this.cancelOrderService.execute(orderId, reason);
  }



}