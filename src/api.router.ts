import { Router } from "express";
import { AuthMiddleware } from "./auth/auth.middleware";
import { AuthRouter } from "./auth/auth.router";
import { CommentRouter } from "./comment/comment.router";
import { PostRouter } from "./post/post.router";
import { UserRouter } from "./user/user.router";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/users", AuthMiddleware, UserRouter);
router.use("/posts", AuthMiddleware, PostRouter);
router.use("/comments", AuthMiddleware, CommentRouter);

export { router as ApiRouter }