import { env } from "../lib/env";
import type { Request, Response, CookieOptions } from "express";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "session";

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV == "production",
    sameSite: "lax",
    path: "/",
};

export const createSession = async (res: Response, userId: string) => {
    const token = jwt.sign({ id: userId }, env.SECRET_KEY, {
        expiresIn: "1d",
    });

    res.cookie(COOKIE_NAME, token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 1000,
    });
};

export const clearSession = (res: Response) => {
    res.clearCookie(COOKIE_NAME, cookieOptions);
};
