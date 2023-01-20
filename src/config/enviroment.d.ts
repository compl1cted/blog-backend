declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            API_PORT: number;
            FRONT_URL: string;
            API_URL: string;
            DB_DIALECT: type;
            DB_HOST: string;
            DB_PORT: number;
            DB_USER: string
            DB_PASSWORD: string;
            DB_NAME: string;
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
            SMTP_HOST: string;
            SMTP_PORT: number;
            SMTP_USER: string;
            SMTP_PASSWORD: string;
        }
    }
}

export { __global }