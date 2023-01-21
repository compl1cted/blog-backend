import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthRouter } from "./auth.route";
import { PostRouter } from "./post.route";
import { UserRouter } from "./user.route";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/users", AuthMiddleware, UserRouter);
router.use("/posts", AuthMiddleware, PostRouter);

export { router as ApiRouter }