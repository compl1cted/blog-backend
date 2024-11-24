import { UserService } from "../user/user.service";
import { AuthResponse } from "./dto/auth-response.dto";
import { HttpError } from "../common/error/http-errors";
import { MailService } from "../mail/mail.service";
import { createHmac, randomUUID } from "crypto";
import { UserDto } from "../user/dto/user.dto";
import { PASSWORD_HASHING_METHOD } from "../common/consts";
import { TokenPayload } from "../user/dto/token.dto";
import {sign, verify} from "jsonwebtoken";
import { AccessTokenConfig, RefreshTokenConfig } from "./token.config";
import {ConfigService} from "../config/config.service";
import {plainToInstance} from "class-transformer";

export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly mailService: MailService
    ) { }

    async signIn(username_or_email: string, password: string): Promise<AuthResponse> {
        const user = await this.userService.findByUsernameOrEmail(username_or_email);
        if (!user) {
            throw HttpError.BadRequest('User not found!');
        }
        let isMatch = this.hashPassword(password) === user.password;
        if (!isMatch) {
            throw HttpError.BadRequest("Password is invalid!");
        }
        return await this.saveTokens(user);
    }

    async signUp(username: string, email: string, password: string): Promise<AuthResponse> {
        const usernameExists = await this.userService.findByUsername(username);
        if (usernameExists) {
            throw HttpError.BadRequest('Username already exist!');
        }

        const emailExists = await this.userService.findByEmail(email);
        if (emailExists) {
            throw HttpError.BadRequest('Email already exist!');
        }

        const activationLink = randomUUID();
        await this.mailService.SendActivationMail(email, `${process.env.API_URL}:${process.env.API_PORT}/api/auth/activate/${activationLink}`);

        let hashedPassword = this.hashPassword(password);
        const newUser = await this.userService.create({username, email, password: hashedPassword, activationLink});
        if (!newUser) {
            throw HttpError.ServerError('Failed to create user!');
        }
        return this.saveTokens(newUser);
    }

    async logout(refreshToken: string) {
        return await this.userService.removeToken(refreshToken);
    }

    async activate(activationLink: string) {
        let user = await this.userService.findByActivationLink(activationLink);
        if (!user) {
            throw HttpError.BadRequest("Invalid Activation Link!");
        }
        user.isActivated = true;
        await this.userService.update(user.id, user);
    }

    async refresh(refreshToken: string): Promise<AuthResponse> {
        if (!refreshToken) {
            throw HttpError.UnauthorizedError("Refresh token is undefined!");
        }

        const tokenData = this.validateToken(refreshToken);
        const user = await this.userService.findByToken(refreshToken);

        if (!tokenData) {
            throw HttpError.UnauthorizedError("Failed to validate refresh token!");
        }

        if (!tokenData.payload.id || !user) {
            throw HttpError.UnauthorizedError();
        }

        if (!user === null) {
            throw HttpError.BadRequest("User does not exist!");
        }

        return await this.saveTokens(user);
    }


    validateToken(token: string): TokenPayload {
        try {
            const { jwtSecret } = this.configService;
            return verify(token, jwtSecret) as TokenPayload;
        }
        catch (error) {
            throw HttpError.UnauthorizedError(error);
        }
    }

    private hashPassword(password: string) {
        return createHmac(PASSWORD_HASHING_METHOD, password).digest("hex");
    }

    private async saveTokens(user: UserDto): Promise<AuthResponse> {
        const {jwtSecret} = this.configService;
        const accessToken = sign({payload: user}, jwtSecret, AccessTokenConfig);
        const refreshToken = sign({payload: user}, jwtSecret, RefreshTokenConfig);
        const authResponse = plainToInstance(AuthResponse, {
            accessToken,
            refreshToken,
            user
        }, { excludeExtraneousValues: true });

        await this.userService.updateToken(user.id, authResponse.refreshToken);

        return authResponse;
    }
}
