import express, { Router, Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CorsConfig } from "./config/cors.config";
import {AppController} from "./app.controller";

import { ConnectToDb } from "./config/database.config";
import { UserModule } from "./user/user.module";
import { TokenModule } from "./token/token.module";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { MailModule } from "./mail/mail.module";


class ServerModule {
    private readonly port: number;
    private readonly host: Express;
    private readonly appRouter: Router;
    private readonly appController: AppController;
    private readonly userModule: UserModule;
    private readonly tokenModule: TokenModule;
    private readonly mailModule: MailModule;
    private readonly authModule: AuthModule;
    private readonly postModule: PostModule;
    private readonly commentModule: CommentModule;

    constructor() {
        this.userModule = new UserModule();
        this.tokenModule = new TokenModule(this.userModule.getService());
        this.mailModule = new MailModule();
        this.authModule = new AuthModule(this.userModule.getService(), this.tokenModule.getService(), this.mailModule.getService());
        this.postModule = new PostModule();
        this.commentModule = new CommentModule();
        this.port = Number(process.env.API_PORT) | 9000;

        this.host = express();
        this.host.use(cors(CorsConfig));
        this.host.use(cookieParser());
        this.host.use(express.json());
        this.host.use(express.urlencoded({ extended: true }));
        this.appController = new AppController();

        const authController = this.authModule.getController();
        
        this.appRouter = Router();
        this.appRouter.use("/auth", this.authModule.getRouter());
        this.appRouter.use("/users", authController.middleware.bind(authController), this.userModule.getRouter());
        this.appRouter.use("/posts", authController.middleware.bind(authController), this.postModule.getRouter());
        this.appRouter.use("/comments", authController.middleware.bind(authController), this.commentModule.getRouter());
        this.host.use("/api", this.appRouter, this.appController.errorHandle.bind(this.appController));
    }

    public async start(): Promise<void> {
        try {
            this.host.listen(this.port, () => console.log("Server started on port: " + this.port));
            await ConnectToDb();
        } catch (error) {
            console.error(error);
        }
    }
}

export const app = new ServerModule();