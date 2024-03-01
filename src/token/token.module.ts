import { UserService } from "../user/user.service";
import { TokenRepositoryTypeORM } from "./token.repository";
import { TokenService } from "./token.service";

export class TokenModule {
    private readonly repository: TokenRepositoryTypeORM;
    private service: TokenService
    constructor(private readonly userService: UserService) {
        this.repository = new TokenRepositoryTypeORM();
        this.service = new TokenService(this.repository, this.userService);
    }

    public getService() {
        return this.service;
    }
}