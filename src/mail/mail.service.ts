import { createTransport, Transporter, TransportOptions } from "nodemailer"
import MailLayout from "./mail.config";

export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    } as TransportOptions);
  }

  async SendActivationMail(userEmail: string, activationLink: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: "Account activation!" + process.env.API_URL,
      text: '',
      html: MailLayout(activationLink)
    });
  }
}