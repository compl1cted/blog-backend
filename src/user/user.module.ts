import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Router } from "express";
import {getRepository} from "../common/typeorm/orm.config";
import {UserEntity} from "./entity/user.entity";

export class UserModule {
    private readonly router: Router;
    private readonly controller: UserController;
    private readonly service: UserService;

    constructor() {
        this.service = new UserService(getRepository(UserEntity));
        this.controller = new UserController(this.service);

        this.router = Router();
        this.router.get("/:id", this.controller.findById.bind(this.controller));
        this.router.get("/", this.controller.findAll.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/:id", this.controller.delete.bind(this.controller));
    }

    get getService(): UserService {
        return this.service;
    }

    get getRouter(): Router {
        return this.router;
    }

}
