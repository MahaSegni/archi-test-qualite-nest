import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from './presentation/order.controller';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import { CreateOrderService } from './domain/use_case/create-order.service';
import { PayOrderService } from './domain/use_case/pay-order.service';
import { SetShippingAddressOrderService } from './domain/use_case/set-shipping-address-order.service';
import { CancelOrderService } from './domain/use_case/cancel-order.service';
import { SetInvoiceAddressOrderService } from './domain/use_case/set-invoice-address.service';
import { OrderManagerService } from './crado/order-manager.service';
import { OrderValidationService } from './crado/order-validation.service';
import { EmailService } from './crado/email-service';
import { SmsService } from './crado/sms-service';
import OrderRepository from './infrastructure/order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [CreateOrderService,
    PayOrderService,SetShippingAddressOrderService,
    CancelOrderService, SetInvoiceAddressOrderService,
    OrderManagerService,
    OrderValidationService,
    EmailService,
    SmsService,
    OrderRepository,],
})
export class OrderModule {}