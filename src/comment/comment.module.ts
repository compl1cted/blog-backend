import { Router } from "express";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentRepositoryTypeORM } from "./comment.repository";

export class CommentModule {
    private readonly router: Router;
    private readonly controller: CommentController;
    private readonly service: CommentService;
    private readonly repository: CommentRepositoryTypeORM;

    constructor() {
        this.repository = new CommentRepositoryTypeORM();
        this.service = new CommentService(this.repository);
        this.controller = new CommentController(this.service);
        this.router = Router();
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.findAll.bind(this.controller));
        this.router.get("/:id", this.controller.findById.bind(this.controller));
        this.router.get("/post/:id", this.controller.findByPostId.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/", this.controller.delete.bind(this.controller));
    }

    public getRouter() {
        return this.router;
    }
}