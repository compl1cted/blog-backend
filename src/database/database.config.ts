import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../env/.env") });

const AppDataSource = new DataSource({
    type: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: 5434,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
});

const ConnectToDb = async () => {
    AppDataSource.initialize()
        .then(() => {
            console.log("Database connection established!");
        })
        .catch((error: string) => console.log(error));
}


export { AppDataSource, ConnectToDb };