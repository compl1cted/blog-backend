import { Router } from "express";
import { AuthRouter } from "./auth.route";
import { PostRouter } from "./post.route";
import { UserRouter } from "./user.route";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/post", PostRouter);

export { router as ApiRouter }