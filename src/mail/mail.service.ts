import { createTransport, Transporter, TransportOptions } from "nodemailer"
import { ConfigService } from "../config/config.service";
import MailLayout from "./mail.config";

export class MailService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport(configService.smtpConfig as TransportOptions);
  }

  async SendActivationMail(userEmail: string, activationLink: string) {
    await this.transporter.sendMail({
      from: this.configService.smtpUser,
      to: userEmail,
      subject: "Account activation!" + this.configService.appHost,
      text: '',
      html: MailLayout(activationLink)
    });
  }
}
