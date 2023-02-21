import { Router } from "express";
import { body } from "express-validator";
import { CommentController } from "../controllers/comment.controller";
import { PostService } from "../services/post.service";
import { UserService } from "../services/user.service";

const router = Router();

const commentController = new CommentController(
    new PostService(),
    new UserService()
);

router.post("/", commentController.Create);
router.get("/:id", commentController.FindOne);
router.get("/", commentController.FindAll);
router.put("/", commentController.Update);
router.delete("/", commentController.Delete);

router.get("/post/:id", commentController.FindByPostId);

export { router as CommentRouter };