import type { Request, Response } from "express";
import { signUpSchema } from "../utils/auth";
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import { clearSession, createSession } from "../utils/session";
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
                message: "failed to create account",
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
                message: "failed to signin user",
            });
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            // if exists or not
            const refreshToken = req.cookies["REFRESH_TOKEN"];
            if (!refreshToken) {
                return res.status(404).json({
                    message: "refresh token is missing",
                });
            }

            // verify
            const decoded = jwt.verify(
                refreshToken,
                env.REFRESH_TOKEN_SECRET,
            ) as jwt.JwtPayload;

            const user = await UserModel.findOne(decoded.userId);
            if (!user) {
                // remove the invalid tokens
                clearSession(res);
                return res.status(401).json({
                    message: "invalid token",
                });
            }

            //generate new access, refresh token
            createSession(res, user._id.toString());
            return res.status(200).json({
                message: "tokens refreshed successfully",
            });
        } catch (error) {
            console.log("error refreshing tokens : ", error);
            return res.status(500).json({
                mesage: "failed to refresh tokens",
            });
        }
    },
    logout: async (req: Request, res: Response) => {
        clearSession(res);
        return res.status(200).json({
            message: "logged out successfully",
        });
    },
    profile: async (req: Request, res: Response) => {
        try {
            // select and not populate(for getting details through ref)
            const user = await UserModel.findById({ _id: req.userId }).select(
                "-password",
            );
            if (!user) {
                return res.status(404).json({
                    message: "user not found",
                });
            }
            return res.status(200).json({
                message: "user found",
                user: user,
            });
        } catch (error) { }
    },
};
