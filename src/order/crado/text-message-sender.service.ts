import { Order } from 'src/order/domain/entity/order.entity';

export class TextMessageSenderService {
  constructor(private readonly twilio: Twilio) {}

  async sendTextMessage(order: Order): Promise<void> {
    const accountSid = 'your_twilio_account_sid';
    const authToken = 'your_twilio_auth_token';
    const client = this.twilio(accountSid, authToken);

    await client.messages.create({
      body: `Votre commande numéro ${order.id} a été confirmée.`,
      from: '+1234567890',
      to: order.customerPhoneNumber,
    });
  }
}