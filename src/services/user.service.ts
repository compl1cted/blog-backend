import { AppDataSource } from "../config/database.config";
import { UserEntity } from "../models/user.enity";
import { BaseService } from "./base.service";

export class UserService extends BaseService<UserEntity> {

    constructor() {
        super(UserEntity, AppDataSource);
    }

    async FindByUsernameOrEmail(LoginOrEmail: string): Promise<UserEntity | null> {
        return await this.findOneBy([{ Username: LoginOrEmail }, { Email: LoginOrEmail }]);
    }

    async FindByUsername(Username: string): Promise<UserEntity | null> {
        return await this.findOneBy({ Username });
    }

    async FindByEmail(Email: string): Promise<UserEntity | null> {
        return await this.findOneBy({ Email });
    }

    async FindByActivationLink(ActivationLink: string): Promise<UserEntity | null> {
        return await this.findOneBy({ ActivationLink });
    }
}