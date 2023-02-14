import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthRouter } from "./auth.router";
import { CommentRouter } from "./comment.router";
import { PostRouter } from "./post.router";
import { UserRouter } from "./user.router";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/users", AuthMiddleware, UserRouter);
router.use("/posts", AuthMiddleware, PostRouter);
router.use("/comments", AuthMiddleware, CommentRouter);

export { router as ApiRouter }