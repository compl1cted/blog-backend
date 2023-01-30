import { UserService } from "./user.service";
import { TokenService } from "./token.service";
import bcrypt from "bcrypt";
import { UserEntity } from "../models/user.enity";
import { UserJwtPayload } from "../models/dtos/auth/jwt_payload.dto";
import { TokensDto } from "../models/dtos/auth/tokens.dto";
import { HttpError } from "../errors/http-errors";
import { MailService } from "./mail.service";
import * as uuid from "uuid"

export class AuthService {
    private userService: UserService;
    private tokenService: TokenService;
    private mailService: MailService
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
        this.mailService = new MailService();
    }
    async SignIn(username_or_email: string, password: string): Promise<TokensDto> {
        const User = await this.userService.FindByUsernameOrEmail(username_or_email);
        if (!User) {
            throw HttpError.BadRequest("User not found!");
        }
        let isMatch = bcrypt.compare(password, User.Password);
        if (!isMatch) {
            throw HttpError.BadRequest("Password is invalid!");
        }

        let tokens = await this.SaveGeneratedTokens(User);
        return tokens;
    }

    async SignUp(username: string, email: string, password: string): Promise<TokensDto> {
        const usernameExists = await this.userService.FindByUsername(username);
        if (usernameExists) {
            throw HttpError.BadRequest("Username already exist!");
        }

        const emailExists = await this.userService.FindByEmail(email);
        if (emailExists) {
            throw HttpError.BadRequest("Email already exist!");
        }

        const activationLink = uuid.v4();
        await this.mailService.SendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        let hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new UserEntity(username, email, hashedPassword, activationLink);
        await this.userService.Create(newUser);

        let tokens = this.SaveGeneratedTokens(newUser);
        return tokens;
    }

    async Logout(refreshToken: string) {
        return await this.tokenService.RemoveToken(refreshToken);
    }

    async Activate(activationLink: string) {
        let user = await this.userService.FindByActivationLink(activationLink);
        if (user === null) {
            throw HttpError.BadRequest("Invalid Activation Link!");
        }
        user.IsActivated = true;
        await this.userService.Update(user);
    }

    async Refresh(refreshToken: string): Promise<TokensDto> {
        if (!refreshToken) {
            throw HttpError.UnauthorizedError();
        }

        const userData = this.tokenService.ValidateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenService.FindToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw HttpError.UnauthorizedError();
        }

        const user = await this.userService.FindOne(userData.Id);
        if (user === null) {
            throw HttpError.BadRequest("User does not exist!");
        }

        return await this.SaveGeneratedTokens(user);
    }

    private async SaveGeneratedTokens(user: UserEntity): Promise<TokensDto> {
        let payload = new UserJwtPayload(user.Id, user.Username, user.Email, user.IsActivated);
        let tokens = this.tokenService.GenerateTokens(payload);
        await this.tokenService.SaveRefreshToken(tokens.RefreshToken, user);

        return tokens;
    }
}