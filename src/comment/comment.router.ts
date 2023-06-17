import { Router } from "express";
import { body } from "express-validator";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentRepository } from "./comment.repository";

const router = Router();

const commentController = new CommentController(
    new CommentService(new CommentRepository())
);

router.post("/", commentController.create);
router.get("/:id", commentController.findOne);
router.get("/", commentController.findAll);
router.put("/", commentController.update);
router.delete("/", commentController.delete);

router.get("/post/:id", commentController.findByPostId);

export { router as CommentRouter };