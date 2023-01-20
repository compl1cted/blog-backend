import nodemailer, { Transporter } from "nodemailer"
import MailLayout from "../config/mail.config";

export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }
  async SendActivationMail(userEmail: string, activationLink: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: "Account activation!" + process.env.API_URL,
      text: '',
      html: MailLayout(userEmail, activationLink)
    });
  }
}