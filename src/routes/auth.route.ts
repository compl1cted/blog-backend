import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const AuthRoute = Router();

const authController = new AuthController();

AuthRoute.post("/sign_in", authController.SignIn);

AuthRoute.post("/sign_up",
    body("username").isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5, max: 30 }),
    authController.SignUp);

AuthRoute.get("/users", AuthMiddleware, authController.GetUsers);

export { AuthRoute };