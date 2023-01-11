import "reflect-metadata"
import { DataSource } from "typeorm"
import { PostModel } from "../models/post.model"
import { RoleModel } from "../models/role.model"
import { UserModel } from "../models/user.model"
import { logger } from "./logger.config"


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "123",
    database: "blog",
    entities: [UserModel, RoleModel, PostModel],
    synchronize: true,
    logging: false,
});

const ConnectToDb = async () => {
    AppDataSource.initialize()
        .then(() => {
            logger.log("info", "Database connection established!");
        })
        .catch((error: string) => console.log(error));
}


export { AppDataSource, ConnectToDb };