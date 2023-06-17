import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "./user.controller";
import { AuthMiddleware } from "../auth/auth.middleware";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

const router = Router();

const userController = new UserController(
    new UserService(new UserRepository())
);

router.get("/:id", userController.findOne);
router.get("/", userController.findAll);
router.put("/", userController.update);
router.delete("/:id", userController.delete);

export { router as UserRouter };