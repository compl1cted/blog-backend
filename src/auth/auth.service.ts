import { UserService } from "../user/user.service";
import { TokenService } from "../token/token.service";
import { TokenPayload } from "../token/token.dto";
import { TokensDto } from "./auth.dto";
import { HttpError } from "../errors/http-errors";
import { MailService } from "../mail/mail.service";
import * as uuid from "uuid"
import { createHmac } from "crypto";
import { UserDto } from "../user/user.dto";

export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly mailService: MailService
    ) { }

    async SignIn(username_or_email: string, password: string): Promise<TokensDto> {
        const user = await this.userService.findByUsernameOrEmail(username_or_email);
        if (!user) {
            throw HttpError.BadRequest("User not found!");
        }
        let isMatch = createHmac("sha256", password).digest("hex") === user.password;
        if (!isMatch) {
            throw HttpError.BadRequest("Password is invalid!");
        }

        let tokens = await this.SaveGeneratedTokens(user);
        return tokens;
    }

    async SignUp(username: string, email: string, password: string): Promise<TokensDto> {
        const usernameExists = await this.userService.findByUsername(username);
        if (usernameExists) {
            throw HttpError.BadRequest("Username already exist!");
        }

        const emailExists = await this.userService.findByEmail(email);
        if (emailExists) {
            throw HttpError.BadRequest("Email already exist!");
        }

        const activationLink = uuid.v4();
        await this.mailService.SendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

        let hashedPassword = createHmac("sha256", password).digest("hex");
        const newUser = await this.userService.create({username, email, password: hashedPassword, activationLink});
        if (!newUser) {
            throw HttpError.ServerError("Failed to create user!");
        }

        let tokens = this.SaveGeneratedTokens(newUser);
        return tokens;
    }

    async Logout(refreshToken: string) {
        return await this.tokenService.remove(refreshToken);
    }

    async Activate(activationLink: string) {
        let user = await this.userService.findByActivationLink(activationLink);
        if (user === null) {
            throw HttpError.BadRequest("Invalid Activation Link!");
        }
        user.isActivated = true;
        await this.userService.updateLink(user.id, activationLink);
    }

    async Refresh(refreshToken: string): Promise<TokensDto> {
        if (!refreshToken) {
            throw HttpError.UnauthorizedError();
        }

        const tokenData = this.tokenService.ValidateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenService.findToken(refreshToken);
        if (!tokenData.payload.id || !tokenFromDb) {
            throw HttpError.UnauthorizedError();
        }

        const user = await this.userService.findOne(tokenData.payload.id);
        if (user === null) {
            throw HttpError.BadRequest("User does not exist!");
        }

        return await this.SaveGeneratedTokens(user);
    }

    private async SaveGeneratedTokens(user: UserDto): Promise<TokensDto> {
        let tokens = this.tokenService.GenerateTokens(user);
        await this.tokenService.SaveRefreshToken(tokens.RefreshToken, user);

        return tokens;
    }
}