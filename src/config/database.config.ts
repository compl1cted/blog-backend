import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserModel } from "../models/user.model"
import { TokenModel } from "../models/token.model"
import { RoleModel } from "../models/role.model"
import { PostModel } from "../models/post.model"


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "123",
    database: "blog",
    entities: [UserModel, TokenModel, RoleModel, PostModel],
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