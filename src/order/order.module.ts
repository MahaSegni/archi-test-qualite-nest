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
import OrderRepositoryTypeOrm from './infrastructure/persistance/order.repository';
import { PdfGenerator } from './infrastructure/pdf/pdf-generator';
import { GenerateOrderPdfService } from './application/use_case/generate-order-pdf.service';
import { generatePdfInterface } from './domain/port/pdf/generatePdf.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [
    OrderRepositoryTypeOrm,
    PdfGenerator,
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
    {
      provide: GenerateOrderPdfService,
      useFactory: (
        orderRepository: OrderRepositoryInterface,
        pdfGenerator: generatePdfInterface,
      ) => {
        return new GenerateOrderPdfService(orderRepository, pdfGenerator);
      },
      inject: [OrderRepositoryTypeOrm, PdfGenerator],
    },
  ],
  
})
export class OrderModule {}
