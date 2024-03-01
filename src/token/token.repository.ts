import { TokenEntity } from "./token.entity";
import { Repository } from "typeorm";
import { CreateTokenDto, TokenDto, TokenEntityToDto, UpdateTokenDto } from "./token.dto";
import { AppDataSource } from "../config/database.config";

export class TokenRepositoryTypeORM {
    private readonly repository: Repository<TokenEntity>;
    constructor() {
        this.repository = new Repository<TokenEntity>(TokenEntity, AppDataSource.createEntityManager());
    }

    async create(createTokenDto: CreateTokenDto): Promise<TokenDto | null> {
        const newTokenEntity = await this.repository.save(createTokenDto);
        if (!newTokenEntity) return null;
        return TokenEntityToDto(newTokenEntity);
    }

    async findTokenByValue(refreshToken: string): Promise<TokenDto | null> {
        return await this.repository.findOneBy({ refreshToken: refreshToken });
    }

    async findTokenByUserId(id: number):Promise<TokenDto | null>{
        return await this.repository.findOneBy({userId: id});
    }

    async update(id: number, updateTokenDto: UpdateTokenDto): Promise<void> {
        await this.repository.update(id, updateTokenDto);
    }

    async updateToken(id: number, newToken: string): Promise<void> {
        await this.repository.update(id, {refreshToken: newToken});
    }

    async deleteTokenByValue(refreshToken: string): Promise<void> {
        await this.repository.delete({ refreshToken: refreshToken });
    }
}