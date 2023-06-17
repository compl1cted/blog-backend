import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "./auth.middleware";
import { AuthService } from "./auth.service";
import { MailService } from "../mail/mail.service";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";
import { TokenRepository } from "../token/token.repository";

const router = Router();

const authController = new AuthController(
    new AuthService(
        new UserService(new UserRepository()),
        new TokenService(new TokenRepository(), new UserService( new UserRepository())),
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