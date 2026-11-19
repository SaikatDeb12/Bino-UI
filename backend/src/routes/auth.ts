import { Router } from "express";
import { authController } from "../controllers/auth";
const { signup } = authController;

export const authRouter = Router();

authRouter.post("/signup", signup);
