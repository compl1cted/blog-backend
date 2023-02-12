import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { parse } from "path";
import { HttpError } from "../errors/http-errors";
import { CommentEntity } from "../models/entities/comment.entity";
import { CommentService } from "../services/comment.service";

import { PostService } from "../services/post.service";
import { UserService } from "../services/user.service";
import { BaseController } from "./base.controller";

export class CommentController extends BaseController<CommentService, CommentEntity> {
    private postService: PostService;
    private userService: UserService;
    constructor() {
        super(new CommentService());

        this.postService = new PostService();
        this.userService = new UserService();
    }
    public Create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { comment } = req.body;
            const post = await this.postService.FindOne(comment.Post.Id);
            const user = await this.userService.FindOne(comment.User.Id);
            if (!user || !post) return res.json("Server Error");
            if (post === null) return res.status(400).json("User does not exist!");
            const commentData = await this.Service.Create(new CommentEntity(comment.Text, comment.Date, post, user));
            console.log(commentData);
            res.json(commentData);
        } catch (error) {
            next(error);
        }
    }

    public FindByPostId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const comments = await this.Service.FindByPostId(Number(id));
            console.log(comments);
            res.json(comments);
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