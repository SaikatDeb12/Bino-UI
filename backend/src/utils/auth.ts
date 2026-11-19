import * as z from "zod";

export const signUpSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.email(),
    password: z.string().min(4).max(25),
});

export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(4).max(25),
});
