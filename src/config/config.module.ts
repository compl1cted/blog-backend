import {ConfigService} from "./config.service";

export class ConfigModule {
    private readonly service: ConfigService;

    constructor() {
        this.service = new ConfigService();
    }

    get getService() {
        return this.service;
    }
}
