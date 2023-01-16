import { AppDataSource } from "../config/database.config";
import { UserModel } from "../models/user.model";
import { DatabaseService } from "./database.service";

export class UserService extends DatabaseService<UserModel> {
    constructor() {
        super(AppDataSource.getRepository(UserModel));
    }

    async FindByUsernameOrEmail(Login: string): Promise<UserModel | null> {
        return await this.repository.findOneBy([{ Username: Login }, { Email: Login }]);
    }

    async FindByUsername(username: string): Promise<UserModel | null> {
        return await this.repository.findOneBy({ Username: username });
    }

    async FindByEmail(email: string): Promise<UserModel | null> {
        return await this.repository.findOneBy({ Email: email });
    }
}