import { TokenPayload } from "./token.dto";
import { TokenEntity } from "./token.entity";
import { sign, verify } from "jsonwebtoken"
import { TokensDto } from "../auth/auth.dto";
import { HttpError } from "../errors/http-errors";
import { config } from "dotenv"
import { resolve } from "path"
import { UserDto } from "../user/user.dto";
import { TokenRepository } from "./token.repository";
import { UserService } from "../user/user.service";

config({ path: resolve(__dirname, "../../env/.env") });

export class TokenService {
    constructor(
        private readonly tokenRepository: TokenRepository,
        private readonly userService: UserService
        ) {}

    GenerateTokens(payload: UserDto): TokensDto {
        const accessToken = sign({ payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
        return new TokensDto(accessToken, refreshToken, payload);
    }

    async findToken(refreshToken: string) {
        return await this.tokenRepository.FindToken(refreshToken);
    }


    async SaveRefreshToken(refreshToken: string, userPayload: UserDto): Promise<TokenEntity> {
        const ExistingToken = await this.tokenRepository.findOneBy({ id: userPayload.id });
        if (ExistingToken !== null) {
            ExistingToken.refreshToken = refreshToken;
            await this.tokenRepository.save(ExistingToken);
            return ExistingToken;
        }
        const user = await this.userService.findOne(userPayload.id);
        if (!user){
            throw HttpError.UnauthorizedError("User is not found!");
        }
        
        return await this.tokenRepository.create({refreshToken, userId: userPayload.id});
    }

    ValidateAccessToken(accessToken: string): TokenPayload {
        try {
            const verifyResult = verify(accessToken, process.env.JWT_ACCESS_SECRET);
            const userData = verifyResult as TokenPayload;
            return userData;
        }
        catch (error) {
            throw HttpError.UnauthorizedError(error);
        }
    }

    ValidateRefreshToken(refreshToken: string): TokenPayload {
        try {
            const verifyResult = verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const userData = verifyResult as TokenPayload;
            return userData;
        }
        catch (error) {
            throw HttpError.UnauthorizedError();
        }
    }

    async remove(refreshToken: string) {
        return await this.tokenRepository.delete({refreshToken});
    }
}