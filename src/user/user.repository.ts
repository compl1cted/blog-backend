import { UserEntity } from "./user.entity";
import { BaseRepository } from "../database/base.repository";

export class UserRepository extends BaseRepository<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async FindByUsernameOrEmail(LoginOrEmail: string): Promise<UserEntity | null> {
        return await this.findOneBy([{ username: LoginOrEmail }, { email: LoginOrEmail }]);
    }

    async FindByUsername(Username: string): Promise<UserEntity | null> {
        return await this.findOneBy({ username: Username });
    }

    async FindByEmail(Email: string): Promise<UserEntity | null> {
        return await this.findOneBy({ email: Email });
    }

    async FindByActivationLink(ActivationLink: string): Promise<UserEntity | null> {
        return await this.findOneBy({ activationLink: ActivationLink });
    }
}