import { OrderItem } from '../entity/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  SHIPPED = 'SHIPPED',
}

@Entity()
export class Order {
  static MAX_ITEMS = 5;
 
  static AMOUNT_MINIMUM = 5;
 
  static AMOUNT_MAXIMUM = 500;

  static DELIVERY_PRICE = 5;

  static MIN_ITEMS_DELIVERY = 3;

  @CreateDateColumn()
  @Expose({ groups: ['group_orders'] })
  createdAt: Date;

  @PrimaryGeneratedColumn()
  @Expose({ groups: ['group_orders'] })
  id: string;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  price: number;

  @Column()
  @Expose({ groups: ['group_orders'] })
  customerName: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    nullable: true,
  })
  @Expose({ groups: ['group_orders'] })
  orderItems: OrderItem[];

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  shippingAddress: string | null;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  invoiceAddress: string | null;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  shippingAddressSetAt: Date | null;

  @Column()
  @Expose({ groups: ['group_orders'] })
  status: string;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  paidAt: Date | null;

  pay(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Order not pending');
    }

    if (this.price > Order.AMOUNT_MAXIMUM) {
      throw new Error('Total amount > 500 euros');
    }

    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
  }
  addDelivery(newAddress : string): void {
    if (this.orderItems.length <= Order.MIN_ITEMS_DELIVERY) {
      throw new Error('Delivery if > 3 items');
    }

    if (this.status !== OrderStatus.PENDING && !this.shippingAddressSetAt) {
      throw new Error('Delivery can only be added if the order is already paid');
    }
    this.shippingAddress = newAddress;

    
      this.price += Order.DELIVERY_PRICE;
      this.shippingAddressSetAt = new Date();

}
}
