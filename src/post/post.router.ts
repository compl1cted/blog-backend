import { Router } from "express";
import { body } from "express-validator";
import { PostController } from "./post.controller";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";

const router = Router();

const postController = new PostController(new PostService(new PostRepository()));

router.post("/", postController.create);
router.get("/:id", postController.findOne);
router.get("/", postController.findAll);
router.put("/", postController.update);
router.delete("/", postController.delete);

router.get("/user/:id", postController.findByUserId);

export { router as PostRouter };