import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../lib/env";
import { ACCESS_TOKEN } from "../utils/session";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const token = req.cookies[ACCESS_TOKEN];
        console.log(token);

        if (!token) {
            return res.status(404).json({ message: "token not found" });
        }

        const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch {
        return res.status(401).json({
            message: "invalid token",
        });
    }
}
