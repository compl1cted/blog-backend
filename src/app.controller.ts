import { Request, Response,  NextFunction } from "express";
import { HttpError } from "./utils/http-errors";
import {logger} from "./config/logger.config";

export class AppController {
    errorHandle(error: any, req: Request, res: Response, next: NextFunction) {
        logger.error(error);
    
        if (error instanceof HttpError) {
            return res.status(error.Status).json({ message: error.message, errors: error.Errors });
        }
    
        return res.status(500).json(`Unexpected error: ${error}`);
    }
}