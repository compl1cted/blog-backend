import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { HttpError } from "../errors/http-errors";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

export class UserController {
    constructor(private readonly userService: UserService) {}

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const user = await this.userService.findOne(+id);
            res.json(user).status(200);
        } catch (error) {
            next(error);
        }
    }

    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.findAll();
            res.json(users).status(200);
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const updatedUser = req.body as Partial<UserDto>;
            const postData = await this.userService.update(+id, updatedUser);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.body;
            const result = await this.userService.delete(userId);
            res.json(result).status(200);
        } catch (error) {
            next(error)
        }
    }
}