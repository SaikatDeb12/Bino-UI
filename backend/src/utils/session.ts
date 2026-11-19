import { env } from "../lib/env";
import type { Request, Response, CookieOptions } from "express";
import jwt from "jsonwebtoken";

export const ACCESS_TOKEN = "session";
export const REFRESH_TOKEN = "session";

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV == "production",
    sameSite: "lax",
    path: "/",
};

export const createSession = async (res: Response, userId: string) => {
    const accessToken = jwt.sign({ userId: userId }, env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
        { userId: userId },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" },
    );

    res.cookie(ACCESS_TOKEN, accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
    });

    res.cookie(REFRESH_TOKEN, refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export const clearSession = (res: Response) => {
    res.clearCookie(ACCESS_TOKEN, cookieOptions);
    res.clearCookie(REFRESH_TOKEN, cookieOptions);
};
