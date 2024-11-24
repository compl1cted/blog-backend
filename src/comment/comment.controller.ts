import { Request, Response, NextFunction } from "express";
import { CommentService } from "./comment.service";
import { CommentDto } from "./dto/comment.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";

export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const comment = req.body as CreateCommentDto;
            const commentData = await this.commentService.create(comment);
            res.json(commentData);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const entities = await this.commentService.findAll();
            res.json(entities);``
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const entity = await this.commentService.findOneById(+id);
            res.json(entity);
        } catch (error) {
            next(error);
        }
    }

    async findByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const entities = await this.commentService.findByUserId(+userId);
            res.json(entities);
        } catch (error) {
            next(error);
        }
    }

    async findByPostId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id || isNaN(+id)) {
                return res.json('Invalid Post Id!').status(404);
            }
            const comments = await this.commentService.findByPostId(+id);
            res.json(comments).status(200);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const comment = req.body as Partial<CommentDto>;
            const commentData = await this.commentService.update(+id, comment);
            res.json(commentData);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const postData = await this.commentService.delete(+id);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }
}
