import { Router } from "express";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepositoryTypeORM } from "./post.repository";
export class PostModule {
    private readonly router: Router;
    private readonly controller: PostController;
    private readonly service: PostService;
    private readonly repository: PostRepositoryTypeORM;

    constructor() {
        this.repository = new PostRepositoryTypeORM();
        this.service = new PostService(this.repository);
        this.controller = new PostController(this.service);
        this.router = Router();
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/user/:id", this.controller.findByUserId.bind(this.controller));
        this.router.get("/title", this.controller.findByTitle.bind(this.controller))
        this.router.get("/:id", this.controller.findOne.bind(this.controller));
        this.router.get("/", this.controller.findAll.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/:id", this.controller.delete.bind(this.controller));
    }

    public getRouter() {
        return this.router;
    }
}