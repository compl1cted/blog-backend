import * as express from "express";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import { connectToDb } from "./common/typeorm/orm.config";
import { errorHandler } from "./common/error/error.handler";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { MailModule } from "./mail/mail.module";
import { ConfigModule } from "./config/config.module";

class AppModule {
    private readonly host: express.Express;
    private readonly appRouter: express.Router;
    private readonly configModule: ConfigModule;
    private readonly userModule: UserModule;
    private readonly mailModule: MailModule;
    private readonly authModule: AuthModule;
    private readonly postModule: PostModule;
    private readonly commentModule: CommentModule;

    constructor() {
        this.configModule = new ConfigModule();
        this.userModule = new UserModule();
        this.mailModule = new MailModule(this.configModule.getService);
        this.authModule = new AuthModule(this.configModule.getService, this.userModule.getService, this.mailModule.getService());
        this.postModule = new PostModule();
        this.commentModule = new CommentModule();

        this.host = express();
        this.host.use(cors({ credentials: true, origin: true }));
        this.host.use(cookieParser());
        this.host.use(express.json());
        this.host.use(express.urlencoded({ extended: true }));

        const authController = this.authModule.getController();
        const authMiddleware = authController.middleware.bind(authController);

        this.appRouter = express.Router();
        this.appRouter.use("/auth", this.authModule.getRouter());
        this.appRouter.use("/users", authMiddleware, this.userModule.getRouter);
        this.appRouter.use("/posts", authMiddleware, this.postModule.getRouter);
        this.appRouter.use("/comments", authMiddleware, this.commentModule.getRouter());
        this.host.use("/api", this.appRouter, errorHandler);
    }

    public async start(): Promise<void> {
        try {
            const { appPort } = this.configModule.getService;
            this.host.listen(appPort, () => console.log(`Server started on port: ${appPort}`));
            await connectToDb();
        } catch (error) {
            console.error(error);
        }
    }
}

export const app = new AppModule();
