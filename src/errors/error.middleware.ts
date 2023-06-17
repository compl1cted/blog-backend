import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger.config";
import { HttpError } from "./http-errors";

export function ErrorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error.message);

    if (error instanceof HttpError) {
        return res.status(error.Status).json({ message: error.message, errors: error.Errors });
    }

    return res.status(500).json("Unxpected error: " + error);
}