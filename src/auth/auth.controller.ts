import { Request, Response, NextFunction } from "express";
import { CookieConfig } from "../config/cookie.config";
import { AuthService } from "./auth.service";
import { HttpError } from "../utils/http-errors";
import { Token } from "../token/token.type";

export class AuthController {

    constructor(private readonly authService: AuthService) { }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { username_or_email, password } = req.body;
            const userData = await this.authService.signIn(username_or_email, password);
            res.cookie("RefreshToken", userData.refreshToken, CookieConfig);
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {      
            const { username, email, password } = req.body;
            const userData = await this.authService.signUp(username, email, password);
            res.cookie("RefreshToken", userData.refreshToken, CookieConfig);
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { RefreshToken } = req.cookies;
            await this.authService.logout(RefreshToken);
            res.clearCookie("RefreshToken", CookieConfig).end();
        }
        catch (error) {
            next(error);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await this.authService.activate(activationLink);
            res.redirect(process.env.FRONT_URL || "");
        }
        catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { RefreshToken } = req.cookies;
            const userData = await this.authService.refresh(RefreshToken);
            res.cookie("RefreshToken", userData.refreshToken, CookieConfig);
            res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    async middleware(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.headers.authorization?.split(" ")[1];
            if (!accessToken) {
                return next(HttpError.UnauthorizedError("Token is undefined!"));
            }
            const userData = this.authService.validate(accessToken, Token.Access);
            if (!userData) {
                return next(HttpError.UnauthorizedError("Failed to validate Token"));
            }
    
            next();
        } catch (error) {
            next(HttpError.UnauthorizedError(error));
        }
    }
}