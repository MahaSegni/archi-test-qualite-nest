import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as twilio from 'twilio';
import { Order } from 'src/order/domain/entity/order.entity';
import { EmailSenderService } from 'src/order/crado/email-sender.service';
import { TextMessageSenderService } from 'src/order/crado/text-message-sender.service';

@Injectable()
export class OrderManagerService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly emailSender: EmailSenderService,
    private readonly textMessageSender: TextMessageSenderService,
  ) {}

  async processOrder(orderId: number): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    // la méthode setIsValide contient le changement de statut de l'entité
    // et la vérification des données (si pas OK, lève une exception)
    const isValid = order.setIsValid();

    this.emailSender.sendEmail(order);

    this.textMessageSender.sendTextMessage(order);

    await this.orderRepository.save(order);
  }
}