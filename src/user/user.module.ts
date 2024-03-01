import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Router } from "express";
import { UserRepositoryTypeORM } from "./user.repository";

export class UserModule {
    private readonly router: Router;
    private readonly controller: UserController;
    private readonly service: UserService;
    private readonly repository: UserRepositoryTypeORM;

    constructor() {
        this.repository = new UserRepositoryTypeORM();
        this.service = new UserService(this.repository);
        this.controller = new UserController(this.service);

        this.router = Router();
        this.router.get("/:id", this.controller.findById.bind(this.controller));
        this.router.get("/", this.controller.findAll.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/:id", this.controller.delete.bind(this.controller));
    }

    public getService(): UserService {
        return this.service;
    }

    public getRouter(): Router {
        return this.router;
    }

}