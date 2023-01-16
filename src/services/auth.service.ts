import { UserService } from "./user.service";
import { TokenService } from "./token.service";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model";
import { UserJwtPayload } from "../models/dtos/auth/jwt_payload.dto";
import { TokensDto } from "../models/dtos/auth/tokens.dto";
import { HttpError } from "../errors/http-errors";
export class AuthService {
    private userService: UserService
    private tokenService: TokenService
    constructor() {
        this.userService = new UserService();
        this.tokenService = new TokenService();
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

        let hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new UserModel(username, email, hashedPassword);
        await this.userService.Create(newUser);

        let tokens = this.SaveGeneratedTokens(newUser);
        return tokens;
    }

    async Logout(refreshToken: string) {
        return await this.tokenService.RemoveToken(refreshToken);
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

    private async SaveGeneratedTokens(user: UserModel): Promise<TokensDto> {
        let payload = new UserJwtPayload(user.Id, user.Username, user.Email);
        let tokens = this.tokenService.GenerateTokens(payload);
        await this.tokenService.SaveRefreshToken(tokens.RefreshToken, user);

        return tokens;
    }
}