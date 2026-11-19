import { Router } from "express";
import { authController } from "../controllers/auth";
const { signup, signin, refreshToken } = authController;

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/refresh", refreshToken);
