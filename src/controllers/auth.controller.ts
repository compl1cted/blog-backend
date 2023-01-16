import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { HttpError } from "../errors/http-errors";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export class AuthController {
    private authService: AuthService;
    private userService: UserService;
    constructor() {
        this.authService = new AuthService();
        this.userService = new UserService();
    }
    public SignIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username_or_email, password } = req.body;
            const userData = await this.authService.SignIn(username_or_email, password);
            res.cookie("RefreshToken", userData.RefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
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
            res.clearCookie("RefreshToken");
        }
        catch (error) {
            next(error);
        }
    }

    public Refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { RefreshToken } = req.cookies;
            const userData = await this.authService.Refresh(RefreshToken);
            res.cookie("RefreshToken", userData.RefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        }
        catch (error) {
            next(error);
        }
    }

    public GetUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let Users = await this.userService.FindAll();
            res.json(Users);
        }
        catch (error) {
            next(error)
        }
    }
}