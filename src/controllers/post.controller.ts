import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { parse } from "path";
import { HttpError } from "../errors/http-errors";
import { PostEntity } from "../models/post.entity";
import { PostService } from "../services/post.service";
import { UserService } from "../services/user.service";

export class PostController {
    private postService: PostService;
    private userService: UserService
    constructor() {
        this.postService = new PostService();
        this.userService = new UserService();
    }
    public Create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { post } = req.body;
            console.log(post.title, post.content, post.date, post.user);
            const user = await this.userService.FindOne(post.user.id);
            if (user === null) return res.status(400).json("User does not exist!");
            const postData = await this.postService.Create(new PostEntity(post.title, post.content, post.date, user));
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
    public FindOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const post = await this.postService.FindOne(parseInt(id));
            res.json(post);
        } catch (error) {
            next(error);
        }
    }
    public FindAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await this.postService.FindAll();
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }
    public Update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { post } = req.body;
            const postData = await this.postService.Update(post);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
    public Delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const postData = await this.postService.Remove(parseInt(id));
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
}