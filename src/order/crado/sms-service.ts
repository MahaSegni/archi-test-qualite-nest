import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import { Order } from '../domain/entity/order.entity';

@Injectable()
export class SmsService {
  private client;

  constructor() {
    const accountSid = 'NH1H5YY72PNN4KAHXM94WMDR';
    const authToken = 'your_twilio_auth_token';
    this.client = twilio(accountSid, authToken);
  }

  async sendOrderConfirmation(order: Order): Promise<void> {
    await this.client.messages.create({
      body: `Votre commande numéro ${order.id} a été confirmée.`,
      from: '+1234567890',
      to: order.customerPhoneNumber,
    });
  }
}
