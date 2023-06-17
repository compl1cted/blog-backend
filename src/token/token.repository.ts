import { TokenEntity } from "./token.entity";
import { BaseRepository } from "../database/base.repository";

export class TokenRepository extends BaseRepository<TokenEntity> {
    constructor() {
        super(TokenEntity);
    }

    async FindToken(refreshToken: string): Promise<TokenEntity | null> {
        return await this.findOneBy({ refreshToken: refreshToken });
    }

    async FindTokenByUserId(id: number):Promise<TokenEntity | null>{
        return await this.findOneBy({userId: id});
    }

    async RemoveToken(refreshToken: string) {
        return await this.delete({ refreshToken: refreshToken });
    }
}