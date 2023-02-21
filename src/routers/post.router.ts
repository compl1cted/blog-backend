import { Router } from "express";
import { body } from "express-validator";
import { PostController } from "../controllers/post.controller";
import { UserService } from "../services/user.service";

const router = Router();

const postController = new PostController(new UserService());

router.post("/", postController.Create);
router.get("/:id", postController.FindOne);
router.get("/", postController.FindAll);
router.put("/", postController.Update);
router.delete("/", postController.Delete);

router.get("/user/:id", postController.FindByUserId);

export { router as PostRouter };