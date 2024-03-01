import "reflect-metadata"
import { DataSource } from "typeorm"
import { resolve } from "path"
import { config } from "dotenv"

config({ path: resolve(__dirname, "../../env/.env") });

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
});

const ConnectToDb = async (): Promise<void> => {
    AppDataSource.initialize()
        .then(() => {
            console.log("Database connection established!");
        })
        .catch((error: string) => console.log(error));
}


export { AppDataSource, ConnectToDb };