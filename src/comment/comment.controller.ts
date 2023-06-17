import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { parse } from "path";
import { HttpError } from "../errors/http-errors";
import { CommentEntity } from "./comment.entity";
import { CommentService } from "./comment.service";
import { CommentDto, CreateCommentDto } from "./comment.dto";

export class CommentController {

    constructor(private readonly commentService: CommentService) {}

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comment = req.body as CreateCommentDto;
            const commentData = await this.commentService.create(comment);
            res.json(commentData);
        } catch (error) {
            next(error);
        }
    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const entity = await this.commentService.findOne(+id);
            res.json(entity);
        } catch (error) {
            next(error);
        }
    }
    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const entities = await this.commentService.findAll();
            res.json(entities);
        } catch (error) {
            next(error);
        }
    }

    
    public findByPostId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const comments = await this.commentService.findByPostId(+id);
            res.json(comments);
        } catch (error) {
            next(error);
        }
    }
    
    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const comment = req.body as Partial<CommentDto>;
            const commentData = await this.commentService.update(+id, comment);
            res.json(commentData);
        } catch (error) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const postData = await this.commentService.delete(+id);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
}