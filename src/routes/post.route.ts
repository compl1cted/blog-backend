import { Router } from "express";
import { body } from "express-validator";
import { PostController } from "../controllers/post.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const postController = new PostController();

router.post("/create", postController.Create);
router.get("/:id", postController.FindOne);
router.get("/", postController.FindAll);
router.put("/", postController.Update);
router.delete("/", postController.Delete);

export { router as PostRouter };