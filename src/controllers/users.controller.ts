import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { HttpError } from "../errors/http-errors";
import { UserEntity } from "../models/entities/user.enity";
import { UserService } from "../services/user.service";
import { BaseController } from "./base.controller";

export class UserController extends BaseController<UserService, UserEntity> {
    constructor() {
        super(new UserService());
    }
    public Update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user } = req.body;
            const postData = await this.Service.Update(user);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
}