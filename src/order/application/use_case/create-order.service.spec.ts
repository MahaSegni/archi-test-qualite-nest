
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { BadRequestException } from '@nestjs/common';
import { CreateOrderService } from './create-order.service';

class OrderRepositoryFake {
  async save(order) {
    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("an order can't be created if the order have more than 5 item", () => {
  it('should return an error', async () => {
    const createOrderService = new CreateOrderService(orderRepositoryFake);

    await expect(
      createOrderService.execute({
        customerName: 'John Doe',
        items: [
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
          { productName: 'item 1', price: 10, quantity: 1 },
        ],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
      }),
    ).rejects.toThrow();
  });
});