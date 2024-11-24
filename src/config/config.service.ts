import {resolve} from "path";
import * as process from "process";
import { configDotenv } from "dotenv";

export class ConfigService {
    constructor() {
        configDotenv({ path: resolve(process.cwd(), '.env') });
    }

    get appPort (): number {
        return +this.getEnvValue('APP_PORT');
    }

    get appHost (): string {
        return this.getEnvValue('APP_HOST');
    }

    get dbHost (): string {
        return this.getEnvValue('POSTGRES_HOST');
    }

    get dbPort (): number {
        return +this.getEnvValue('POSTGRES_PORT');
    }

    get dbUser (): string {
        return this.getEnvValue('POSTGRES_USER');
    }

    get dbPassword (): string {
        return this.getEnvValue('POSTGRES_PASSWORD');
    }

    get dbName (): string {
        return this.getEnvValue('POSTGRES_DB');
    }

    get typeormConfig () {
        return {
            host: this.dbHost,
            port: this.dbPort,
            username: this.dbUser,
            password: this.dbPassword,
            database: this.dbName,
        };
    }

    get jwtSecret (): string {
        return this.getEnvValue('JWT_SECRET');
    }

    get smtpHost(): string {
        return this.getEnvValue('SMTP_HOST');
    }

    get smtpPort (): string {
        return this.getEnvValue('SMTP_PORT');
    }

    get smtpUser (): string {
        return this.getEnvValue('SMTP_USER');
    }

    get smtpPass (): string {
        return this.getEnvValue('SMTP_PASSWORD');
    }

    get smtpConfig () {
        return {
            host: this.smtpHost,
            port: this.smtpPort,
            auth: {
                user: this.smtpUser,
                pass: this.smtpPass,
            },
            secure: false,
        };
    }

    private getEnvValue (value: string): string {
        if (!(value in process.env)) {
            throw new Error(`Undefined dotenv value: ${value}`);
        }

        return process.env[value] as string;
    }
}
