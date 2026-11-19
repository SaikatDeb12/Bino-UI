import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../lib/env";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const token = req.cookies["ACCESS_TOKEN"];

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
