import type { Request, Response } from "express";
import { signUpSchema } from "../utils/auth";
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import { createSession } from "../utils/session";

export const authController = {
    signup: async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const { success, error, data } = signUpSchema.safeParse(body);
            if (!success) {
                return res.status(400).json({
                    message: "invalid request body",
                    error: error.issues[0]?.message,
                });
            }

            const { username, email, password } = data;
            const existingUser = await UserModel.findOne({
                username: username,
            });
            if (existingUser) {
                return res.status(400).json({
                    message: "username already exists",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({
                username: username,
                email: email,
                password: hashedPassword,
            });

            createSession(res, newUser._id.toString());

            return res.status(201).json({
                message: "profile created successfully",
            });
        } catch (error) {
            console.log("signup error : ", error);
            res.status(500).json({
                message: "internal server error",
            });
        }
    },
    signin: async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const { success, error, data } = signUpSchema.safeParse(body);
            if (!success) {
                return res.status(400).json({
                    message: "invalid request body",
                    error: error.issues[0]?.message,
                });
            }

            const { username, password } = data;
            const user = await UserModel.findOne({
                username: username,
            });
            if (!user) {
                return res.status(404).json({
                    message: "no user found",
                });
            }

            const isValidPassword = await bcrypt.compare(
                password,
                user.password,
            );
            if (!isValidPassword) {
                return res.status(401).json({
                    message: "invalid credentials",
                });
            }

            createSession(res, user._id.toString());

            return res.status(200).json({
                message: "login successfull",
            });
        } catch (error) {
            console.log("signup error : ", error);
            res.status(500).json({
                message: "internal server error",
            });
        }
    },
};
