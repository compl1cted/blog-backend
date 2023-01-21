import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

const authController = new AuthController();

router.post("/sign_in", authController.SignIn);

router.post("/sign_up",
    body("username").isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5, max: 50 }),
    authController.SignUp);

router.get("/logout", authController.Logout);

router.get("/activate/:link", authController.Activate);

router.get("/refresh", authController.Refresh)

export { router as AuthRouter };