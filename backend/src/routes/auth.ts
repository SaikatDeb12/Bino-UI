import { Router } from "express";
import { authController } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";
const { signup, signin, refreshToken, logout, profile } = authController;

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/refresh", refreshToken);
authRouter.post("/logout", logout);

authRouter.get("/profile", authMiddleware, profile);
