import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

export class UserController {
    constructor(private readonly userService: UserService) {}

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            if (!id || isNaN(id)) {
                res.json("User id must be a number!").status(404);
            }
            
            const user = await this.userService.findOne(id);
            res.json(user).status(200);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.findAll();
            res.json(users).status(200);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const updatedUser = req.body as Partial<UserDto>;
            const postData = await this.userService.update(+id, updatedUser);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.body;
            const result = await this.userService.delete(userId);
            res.json(result).status(200);
        } catch (error) {
            next(error)
        }
    }
}