import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderRepository from './infrastructure/order.repository';
import OrderController from './presentation/order.controller';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import { CreateOrderService } from './domain/use_case/CreateOrder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [
    CreateOrderService, 
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule {}
