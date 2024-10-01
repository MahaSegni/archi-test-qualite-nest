import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from './presentation/order.controller';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import { CreateOrderService } from './domain/use_case/create-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [CreateOrderService],
})
export class OrderModule {}