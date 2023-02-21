import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthService } from "../services/auth.service";
import { MailService } from "../services/mail.service";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";

const router = Router();

const authController = new AuthController(
    new AuthService(
        new UserService(),
        new TokenService(),
        new MailService()
    )
);

router.post("/sign_in", authController.SignIn);

router.post("/sign_up",
    body("username").isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5, max: 50 }),
    authController.SignUp);

router.get("/logout", AuthMiddleware, authController.Logout);

router.get("/activate/:link", authController.Activate);

router.get("/refresh", authController.Refresh);

export { router as AuthRouter };