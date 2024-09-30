import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
 
@Controller('/orders')
export default class OrderController {
  @Get()
  async getOrders() {
    return 'All orders';
  }
 
  @Post('/create')
  async createOrder(@Body() body: any): Promise<string> {
    this.validateOrder(body);
    return 'OK';
  }
 
  private validateOrder(body: any): void {
  const { customerName, shippingAddress, invoiceAddress, orderItems } = body;
 
  if (!customerName) {
    throw new BadRequestException('Le nom du client est requis');
  }
 
  if (!shippingAddress || !invoiceAddress) {
    throw new BadRequestException('Les adresses de livraison et de facturation sont requises');
  }
 
  if (!orderItems || orderItems.length === 0) {
    throw new BadRequestException('Au moins 1 article');
  }
 
  if (orderItems.length > 5) {
    throw new BadRequestException('Impossible une commande > 5 articles');
  }
 
  const totalAmount = orderItems.reduce((sum: number, item: any) => sum + item.price, 0);
 
  if (totalAmount < 10) {
    throw new BadRequestException('Le montant total > 10€');
  }
}
}