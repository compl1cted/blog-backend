import { MailService } from "./mail.service";
import {ConfigService} from "../config/config.service";

export class MailModule {
    private readonly service: MailService;
    constructor(configService: ConfigService) {
        this.service = new MailService(configService);
    }

    public getService() {
        return this.service;
    }
}
