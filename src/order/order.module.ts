import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/order.repository.interface';
import OrderController from './infrastructure/presentation/order.controller';
import { CreateOrderService } from './application/use_case/create-order.service';
import { PayOrderService } from './application/use_case/pay-order.service';
import { CancelOrderService } from './application/use_case/cancel-order.service';
import { SetInvoiceAddressOrderService } from './application/use_case/set-invoice-address.service';
import { SetShippingAddressOrderService } from './application/use_case/set-shipping-address-order.service';
import OrderRepositoryTypeOrm from './infrastructure/bdd/order.repository';
import { PdfGeneratorService } from './infrastructure/pdf-generator.service';
import { GenerateOrderPdfService } from './application/use_case/generate-order-pdf.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [
    OrderRepositoryTypeOrm,

    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: PayOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new PayOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetInvoiceAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetInvoiceAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetShippingAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetShippingAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    PdfGeneratorService,
    {
      provide: GenerateOrderPdfService,
      useFactory: (orderRepository: OrderRepositoryInterface, pdfGeneratorService: PdfGeneratorService) => {
        return new GenerateOrderPdfService(orderRepository, pdfGeneratorService);
      },
      inject: [OrderRepositoryTypeOrm, PdfGeneratorService],
    }
  ],
  
})
export class OrderModule {}
