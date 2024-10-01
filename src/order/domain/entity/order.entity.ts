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
  SHIPPING_ADDRESS_SET = 'SHIPPING_ADDRESS_SET',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

@Entity()
export class Order {
  static MAX_ITEMS = 5;

  static AMOUNT_MINIMUM = 5;

  static AMOUNT_MAXIMUM = 500;

  static SHIPPING_COST = 5;

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
  private status: string;

  @Column({ nullable: true })
  @Expose({ groups: ['group_orders'] })
  private paidAt: Date | null;

  pay(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Commande déjà payée');
    }

    if (this.price > Order.AMOUNT_MAXIMUM) {
      throw new Error('Montant maximum dépassé');
    }

    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
  }

  setShippingAddress(customerAddress: string): void {
    if (
      this.status !== OrderStatus.PENDING &&
      this.status !== OrderStatus.SHIPPING_ADDRESS_SET
    ) {
      throw new Error('Commande non payée');
    }

    if (this.orderItems.length < Order.MAX_ITEMS) {
      throw new Error('Trop d’articles');
    }

    this.status = OrderStatus.SHIPPING_ADDRESS_SET;
    this.shippingAddressSetAt = new Date();
    this.shippingAddress = customerAddress;
    this.price += Order.SHIPPING_COST;
  }
}