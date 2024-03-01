import { Request, Response, NextFunction } from "express";
import { PostService } from "./post.service";
import { CreatePostDto, PostDto } from "./post.dto";

export class PostController {
    constructor(private readonly postService: PostService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newPost: CreatePostDto = req.body;
            const postData = await this.postService.create(newPost);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }

    async findByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const posts = await this.postService.findByUserId(+id);
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }

    async findByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            const { title } = req.params;
            const posts = await this.postService.findByTitle(title);
            res.json(posts);

        } catch (error) {
            next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const post = await this.postService.findOne(+id);
            res.json(post);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await this.postService.findAll();
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const post = req.body as Partial<PostDto>;
            const postData = await this.postService.update(+id, post);
            res.json(postData);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.postService.delete(+id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}