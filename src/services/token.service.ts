import { UserJwtPayload } from "../models/dtos/auth/jwt_payload.dto";
import { TokenEntity } from "../models/entities/token.entity";
import { BaseService } from "./base.service";
import { sign, verify } from "jsonwebtoken"
import { TokensDto } from "../models/dtos/auth/tokens.dto";
import { HttpError } from "../errors/http-errors";
import { UserEntity } from "../models/entities/user.enity";
import { AppDataSource } from "../config/database.config";
import { config } from "dotenv"
import { resolve } from "path"
import { UserDto } from "../models/dtos/auth/user.dto";

config({ path: resolve(__dirname, "../../env/.env") });

export class TokenService extends BaseService<TokenEntity> {
    constructor() {
        super(TokenEntity, AppDataSource);
    }

    GenerateTokens(payload: UserDto): TokensDto {
        const accessToken = sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
        return new TokensDto(accessToken, refreshToken, payload);
    }

    async FindToken(refreshToken: string): Promise<TokenEntity | null> {
        return await this.findOneBy({ RefreshToken: refreshToken });
    }

    async SaveRefreshToken(refreshToken: string, user: UserEntity): Promise<TokenEntity> {
        const ExistingToken = await this.findOneBy({ User: user });
        if (ExistingToken !== null) {
            ExistingToken.RefreshToken = refreshToken;
            await this.save(ExistingToken);
            return ExistingToken;
        }
        return await this.save(new TokenEntity(refreshToken, user));
    }

    ValidateAccessToken(accessToken: string): UserJwtPayload {
        try {
            const verifyResult = verify(accessToken, process.env.JWT_ACCESS_SECRET);
            const userData = verifyResult as UserJwtPayload;
            return userData;
        }
        catch (error) {
            throw HttpError.UnauthorizedError(error);
        }
    }

    ValidateRefreshToken(refreshToken: string): UserJwtPayload {
        try {
            const verifyResult = verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const userData = verifyResult as UserJwtPayload;
            return userData;
        }
        catch (error) {
            throw HttpError.UnauthorizedError();
        }
    }

    async RemoveToken(refreshToken: string) {
        return await this.delete({ RefreshToken: refreshToken });
    }
}