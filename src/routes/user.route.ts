import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers/users.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const userController = new UserController();

router.get("/:id", userController.FindOne);
router.get("/", userController.FindAll);
router.put("/", userController.Update);
router.delete("/:id", userController.Delete);

export { router as UserRouter };