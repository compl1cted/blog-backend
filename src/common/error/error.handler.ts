import {NextFunction, Request, Response} from "express";
import {logger} from "../logger/logger.config";
import {HttpError} from "./http-errors";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    logger.error(error);

    if (error instanceof HttpError) {
        return res.status(error.Status).json({ message: error.message, errors: error.Errors });
    }

    return res.status(500).json(`Unexpected error: ${error}`);
}
