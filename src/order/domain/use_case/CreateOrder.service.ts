import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderService {
  private static readonly MIN_ORDER_AMOUNT = 10;
  private static readonly MAX_ORDER_ITEMS = 5;

  public createOrder(orderData: any): string {
    this.validateOrderData(orderData);
    this.validateOrderTotal(orderData.orderItems);

    return 'OK';
  }

  private validateOrderData(orderData: any): void {
    const { customerName, shippingAddress, invoiceAddress, orderItems } = orderData;

    if (!customerName) {
      throw new BadRequestException('Le nom du client est requis');
    }

    if (!shippingAddress || !invoiceAddress) {
      throw new BadRequestException('Les adresses de livraison et de facturation sont requises');
    }

    if (!orderItems || orderItems.length === 0 || orderItems.length > CreateOrderService.MAX_ORDER_ITEMS) {
      throw new BadRequestException(`La commande doit contenir entre [ 1 et ${CreateOrderService.MAX_ORDER_ITEMS} ] articles`);
    }
  }

  private validateOrderTotal(orderItems: any[]): void {
    const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

    if (totalAmount < CreateOrderService.MIN_ORDER_AMOUNT) {
      throw new BadRequestException(`Le montant total > ${CreateOrderService.MIN_ORDER_AMOUNT}€`);
    }
  }
}
