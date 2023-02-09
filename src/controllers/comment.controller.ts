import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { parse } from "path";
import { HttpError } from "../errors/http-errors";
import { CommentEntity } from "../models/comment.entity";
import { CommentService } from "../services/comment.service";

import { PostService } from "../services/post.service";

export class PostController {
    private commentService: CommentService;
    private postService: PostService
    constructor() {
        this.commentService = new CommentService();
        this.postService = new PostService();
    }
    public Create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { comment } = req.body;
            console.log(comment);
            const post = await this.postService.FindOne(comment.post.Id);
            if (post === null) return res.status(400).json("User does not exist!");
            const commentData = await this.commentService.Create(new CommentEntity(comment.Text, comment.Date, post));
            res.json(commentData);
        } catch (error) {
            next(error);
        }
    }
    public FindOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const post = await this.commentService.FindOne(parseInt(id));
            res.json(post);
        } catch (error) {
            next(error);
        }
    }
    public FindAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await this.commentService.FindAll();
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }
    public Update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { post } = req.body;
            const postData = await this.commentService.Update(post);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
    public Delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const postData = await this.commentService.Remove(parseInt(id));
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
}