import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { HttpError } from "../errors/http-errors";
import { UserService } from "../services/user.service";

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    public FindOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.userService.FindOne(parseInt(id));
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
    public FindAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.FindAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
    public Update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user } = req.body;
            const postData = await this.userService.Update(user);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
    public Delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userData = await this.userService.Remove(parseInt(id));
            res.json(userData);
        } catch (error) {
            next(error);
        }
    }
}