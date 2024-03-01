import { UserService } from "../user/user.service";
import { TokenService } from "../token/token.service";
import { AuthResponse } from "./auth.dto";
import { HttpError } from "../utils/http-errors";
import { MailService } from "../mail/mail.service";
import { createHmac, randomUUID } from "crypto";
import { UserDto } from "../user/user.dto";
import { PASSWORD_HASHING_METHOD } from "../config/consts";
import { Token } from "../token/token.type";
import { TokenPayload } from "../token/token.dto";

export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
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
        return await this.tokenService.remove(refreshToken);
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

        const tokenData = this.tokenService.validateToken(refreshToken, Token.Refresh);
        const tokenFromDb = await this.tokenService.findToken(refreshToken);
        
        if (!tokenData) {
            throw HttpError.UnauthorizedError("Failed to validate refresh token!");
        }

        if (!tokenData.payload.id || !tokenFromDb) {
            throw HttpError.UnauthorizedError();
        }


        const user = await this.userService.findOne(tokenData.payload.id);
        if (user === null) {
            throw HttpError.BadRequest("User does not exist!");
        }

        return await this.saveTokens(user);
    }

    validate(token: string, type: Token): TokenPayload {
        return this.tokenService.validateToken(token, type);
    }

    private hashPassword(password: string) {
        return createHmac(PASSWORD_HASHING_METHOD, password).digest("hex");
    }

    private async saveTokens(user: UserDto): Promise<AuthResponse> {
        let tokens = this.tokenService.generateTokens(user);
        await this.tokenService.saveRefreshToken(tokens.refreshToken, user.id);

        return tokens;
    }
}