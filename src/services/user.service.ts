import { UserEntity } from "../models/user.enity";
import { BaseService } from "./base.service";

export class UserService extends BaseService<UserEntity> {

    async FindByUsernameOrEmail(Login: string): Promise<UserEntity | null> {
        return await this.repository.findOneBy([{ Username: Login }, { Email: Login }]);
    }

    async FindByUsername(username: string): Promise<UserEntity | null> {
        return await this.repository.findOneBy({ Username: username });
    }

    async FindByEmail(email: string): Promise<UserEntity | null> {
        return await this.repository.findOneBy({ Email: email });
    }

    async FindByActivationLink(ActivationLink: string) {
        return await this.repository.findOneBy({ ActivationLink });
    }
}