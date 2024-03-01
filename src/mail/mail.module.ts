import { MailService } from "./mail.service";

export class MailModule {
    private readonly service: MailService;
    constructor() {
        this.service = new MailService();
    }

    public getService() {
        return this.service;
    }
}