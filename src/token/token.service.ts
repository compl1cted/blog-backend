import { TokenPayload } from "./token.dto";
import { sign, verify, } from "jsonwebtoken"
import { AuthResponse } from "../auth/auth.dto";
import { HttpError } from "../utils/http-errors";
import { UserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { AccessTokenConfig, RefreshTokenConfig } from "./token.config";
import { Token } from "./token.type";
import { TokenRepositoryTypeORM } from "./token.repository";

export class TokenService {
    private accessSecret: string = process.env.JWT_ACCESS_SECRET as string;
    private refreshSecret: string = process.env.JWT_REFRESH_SECRET as string;

    constructor(
        private readonly tokenRepository: TokenRepositoryTypeORM,
        private readonly userService: UserService
    ) {}

    generateTokens(payload: UserDto): AuthResponse {
        const accessToken = sign({payload}, this.accessSecret, AccessTokenConfig);
        const refreshToken = sign({payload}, this.refreshSecret, RefreshTokenConfig);
        return new AuthResponse(accessToken, refreshToken, payload);
    }

    async findToken(refreshToken: string) {
        return await this.tokenRepository.findTokenByValue(refreshToken);
    }

    async saveRefreshToken(refreshToken: string, userId: number): Promise<void> {
        const user = await this.userService.findOne(userId);
        if (!user){
            throw HttpError.UnauthorizedError("User is not found!");
        }

        const existingToken = await this.tokenRepository.findTokenByUserId(userId);
        if (existingToken) {
            return await this.tokenRepository.updateToken(existingToken.id, refreshToken);
        }
        await this.tokenRepository.create({refreshToken, userId});
    }

    validateToken(accessToken: string, type: Token) {
        try {
            const secret = type === Token.Access ? this.accessSecret : this.refreshSecret;
            return verify(accessToken, secret) as TokenPayload;
        }
        catch (error) {
            throw HttpError.UnauthorizedError(error);
        }
    }

    async remove(refreshToken: string): Promise<void> {
        await this.tokenRepository.deleteTokenByValue(refreshToken);
    }
}