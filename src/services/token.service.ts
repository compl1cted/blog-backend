import { UserJwtPayload } from "../models/dtos/auth/jwt_payload.dto";
import { TokenModel } from "../models/token.model";
import { DatabaseService } from "./database.service";
import jwt from "jsonwebtoken"
import { TokensDto } from "../models/dtos/auth/tokens.dto";
import { HttpError } from "../errors/http-errors";
import { UserModel } from "../models/user.model";
import { AppDataSource } from "../config/database.config";
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, "../../env/.env") });

export class TokenService extends DatabaseService<TokenModel> {
    constructor() {
        super(AppDataSource.getRepository(TokenModel));
    }

    GenerateTokens(payload: UserJwtPayload): TokensDto {
        const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
        return new TokensDto(accessToken, refreshToken, payload);
    }

    async FindToken(refreshToken: string): Promise<TokenModel | null> {
        return await this.repository.findOneBy({ RefreshToken: refreshToken });
    }

    async SaveRefreshToken(refreshToken: string, user: UserModel): Promise<TokenModel> {
        const ExistingToken = await this.repository.findOneBy({ User: user });
        if (ExistingToken !== null) {
            ExistingToken.RefreshToken = refreshToken;
            await this.repository.save(ExistingToken);
            return ExistingToken;
        }
        return await this.repository.save(new TokenModel(refreshToken, user));
    }

    ValidateAccessToken(accessToken: string): UserJwtPayload {
        try {
            const verifyResult = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            const userData = verifyResult as UserJwtPayload;
            return userData;
        }
        catch (error) {
            throw HttpError.UnauthorizedError(error);
        }
    }

    ValidateRefreshToken(refreshToken: string): UserJwtPayload {
        try {
            const verifyResult = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const userData = verifyResult as UserJwtPayload;
            return userData;
        }
        catch (error) {
            throw HttpError.UnauthorizedError();
        }
    }

    async RemoveToken(refreshToken: string) {
        return await this.repository.delete({ RefreshToken: refreshToken });
    }
}