import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { CookieConfig } from "../config/cookie.config";
import { HttpError } from "../errors/http-errors";
import { AuthService } from "../services/auth.service";

export class AuthController {

    constructor(private authService: AuthService) { }

    public SignIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username_or_email, password } = req.body;
            const userData = await this.authService.SignIn(username_or_email, password);
            res.clearCookie('RefreshToken', { ...CookieConfig });
            res.cookie("RefreshToken", userData.RefreshToken, { ...CookieConfig });
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    public SignUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw HttpError.BadRequest("Request Validation Error", errors.array());
            }
            const { username, email, password } = req.body;
            const userData = await this.authService.SignUp(username, email, password);
            res.clearCookie("RefreshToken", { ...CookieConfig });
            res.cookie("RefreshToken", userData.RefreshToken, { ...CookieConfig });
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    public Logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { RefreshToken } = req.cookies;
            await this.authService.Logout(RefreshToken);
            res.clearCookie("RefreshToken", { ...CookieConfig }).end();
        }
        catch (error) {
            next(error);
        }
    }

    public Activate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const activationLink = req.params.link;
            await this.authService.Activate(activationLink);
            res.redirect(process.env.FRONT_URL);
        }
        catch (error) {
            next(error);
        }
    }

    public Refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { RefreshToken } = req.cookies;
            const userData = await this.authService.Refresh(RefreshToken);
            res.clearCookie("RefreshToken", { ...CookieConfig });
            res.cookie("RefreshToken", userData.RefreshToken, { ...CookieConfig });
            res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }
}