import type { Request, Response } from "express";
import { signUpSchema } from "../utils/auth";
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";

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
            const isExistUsername = await UserModel.findOne({
                username: username,
            });
            if (isExistUsername) {
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

            return res.status(201).json({
                message: "profile created successfully",
                token: token,
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

            const { username, email, password } = data;
            const isExistUser = await UserModel.findOne({
                username: username,
            });
            if (!isExistUser) {
                return res.status(404).json({
                    message: "no user with this username found",
                });
            }

            const isValidPassword = jwt.verify(isExistUser.password, password);
            if (!isValidPassword) {
                return res.status(401).json({
                    message: "invalid password",
                });
            }

            const token = jwt.sign({ userId: isExistUser._id }, env.SECRET_KEY);

            return res.status(200).json({
                message: "login successfull",
                token: token,
            });
        } catch (error) {
            console.log("signup error : ", error);
            res.status(500).json({
                message: "internal server error",
            });
        }
    },
};
