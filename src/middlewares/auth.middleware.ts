import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-errors";
import { TokenService } from "../services/token.service";

const tokenService = new TokenService();

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (!accessToken) {
            return next(HttpError.UnauthorizedError());
        }

        const userData = tokenService.ValidateAccessToken(accessToken);
        if (!userData) {
            return next(HttpError.UnauthorizedError());
        }

        next();
    } catch (error) {
        next(HttpError.UnauthorizedError())
    }
}