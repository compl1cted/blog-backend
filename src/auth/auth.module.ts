import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MailService } from "../mail/mail.service";
import { UserService } from "../user/user.service";
import {ConfigService} from "../config/config.service";

export class AuthModule {
    private readonly router: Router;
    private readonly controller: AuthController;
    private readonly service: AuthService;

    constructor(configService: ConfigService, userService: UserService, mailService: MailService) {
        this.service = new AuthService(configService, userService, mailService);
        this.controller = new AuthController(this.service);
        this.router = Router();
        this.router.post("/sign_in", this.controller.signIn.bind(this.controller));
        this.router.post("/sign_up", this.controller.signUp.bind(this.controller));
        this.router.get("/logout", this.controller.middleware, this.controller.logout.bind(this.controller));
        this.router.get("/activate/:link", this.controller.activate.bind(this.controller));
        this.router.get("/refresh", this.controller.refresh.bind(this.controller));
    }

    public getController = () => {
        return this.controller;
    }

    public getRouter = () => {
        return this.router;
    }
}
