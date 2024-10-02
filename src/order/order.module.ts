import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from './presentation/order.controller';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';
import OrderRepositoryTypeOrm from 'src/order/infrastructure/order.repository';
import { CreateOrderService } from './domain/use_case/create-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],

  providers: [
    {
      // quand j'enregistre la classe CreateOrderService
      provide: CreateOrderService,
      // je demande à Nest Js de créer une instance de cette classe
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      // en lui injectant une instance de OrderRepositoryTypeOrm
      // à la place de l'interface qui est utilisée dans le constructeur de CreateOrderService
      inject: [OrderRepositoryTypeOrm],
    },
  ],
})
export class OrderModule {}