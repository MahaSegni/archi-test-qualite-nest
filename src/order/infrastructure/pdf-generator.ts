import { Injectable } from '@nestjs/common';
import { PdfDocument } from '@ironsoftware/ironpdf';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class PdfGenerator {
  async generateOrderPdf(orderId: string, orderItems: any[]): Promise<Buffer> {
    const htmlContent = `
      <h1>Commande ID: ${orderId}</h1>
      <ul>
        ${orderItems.map(item => `<li>${item.name}: ${item.quantity}</li>`).join('')}
      </ul>
    `;

    const pdf = await PdfDocument.fromHtml(htmlContent);

    const tempPath = join(__dirname, `order_${orderId}.pdf`);

    await pdf.saveAs(tempPath);

    const pdfBuffer = await fs.readFile(tempPath);

    await fs.unlink(tempPath);

    return pdfBuffer;
  }
}
