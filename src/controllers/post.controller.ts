import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { parse } from "path";
import { HttpError } from "../errors/http-errors";
import { PostEntity } from "../models/entities/post.entity";
import { PostService } from "../services/post.service";
import { UserService } from "../services/user.service";
import { BaseController } from "./base.controller";

export class PostController extends BaseController<PostService, PostEntity> {
    constructor(private userService: UserService) {
        super(new PostService());
    }

    public Create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { post } = req.body;
            const user = await this.userService.FindOne(post.User.Id);
            if (user === null) return res.status(400).json("User does not exist!");
            const postData = await this.Service.Create(new PostEntity(post.Title, post.Content, post.Date, user));
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }

    public FindByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const posts = await this.Service.FindByUserId(Number(id));
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }

    public Update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { post } = req.body;
            const postData = await this.Service.Update(post);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
}