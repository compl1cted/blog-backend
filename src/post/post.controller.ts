import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { parse } from "path";
import { HttpError } from "../errors/http-errors";
import { PostEntity } from "./post.entity";
import { PostService } from "./post.service";
import { UserService } from "../user/user.service";
import { CreatePostDto, PostDto } from "./post.dto";

export class PostController {
    constructor(
        private readonly postService: PostService
        ) {}

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newPost = req.body as CreatePostDto;
            const postData = await this.postService.create(newPost);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }

    public findByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const posts = await this.postService.findByUserId(+id);
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const post = await this.postService.findOne(+id);
            res.json(post);
        } catch (error) {
            next(error);
        }
    }

    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await this.postService.findAll();
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const post = req.body as Partial<PostDto>;
            const postData = await this.postService.update(+id, post);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await this.postService.delete(+id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}