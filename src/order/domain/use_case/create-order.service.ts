import { BadRequestException, Inject } from '@nestjs/common';
import { Order } from 'src/order/domain/entity/order.entity';
import OrderRepository from 'src/order/infrastructure/order.repository';

export interface ItemDetailCommand {
  productName: string;
  price: number;
}

export interface CreateOrderCommand {
  items: ItemDetailCommand[];
  customerName: string;
  shippingAddress: string;
  invoiceAddress: string;
}


export class CreateOrderService {

  constructor (@Inject('OrderRepository') private readonly orderRepository: OrderRepository){}
  createOrder(createOrderCommand: CreateOrderCommand): string {
   
    const order = new Order(createOrderCommand); 
    this.orderRepository.save(order);

    return 'Montant de la commande: '+ order.price;

  }
}