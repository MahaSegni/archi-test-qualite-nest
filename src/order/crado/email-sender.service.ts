import { Order } from 'src/order/domain/entity/order.entity';

export class EmailSenderService {
  constructor(private readonly nodeMailer: NodeMailerService) {}

  async sendEmail(order: Order): Promise<void> {
    const transporter = this.nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: order.customerEmail,
      subject: 'Confirmation de commande',
      text: `Votre commande numéro ${order.id} a été confirmée.`,
    };

    await transporter.sendMail(mailOptions);
  }
}