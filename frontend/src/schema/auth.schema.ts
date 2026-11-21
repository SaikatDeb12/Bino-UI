import * as z from "zod";

export const authSchema = (mode: "signin" | "signup") =>
    z
        .object({
            username:
                mode == "signup"
                    ? z
                        .string()
                        .trim()
                        .lowercase()
                        .min(3, "username must be atlest 3 characters long")
                        .max(20)
                    : z.string().optional(),
            email: z.email("Enter a valid email address"),
            password: z
                .string()
                .min(8, "password must be at least 8 characters"),
        })
        .superRefine((data, ctx) => {
            if (mode == "signup" && !data.username?.trim()) {
                ctx.addIssue({
                    code: "custom",
                    path: ["username"],
                    message: "username is required",
                });
            }
        });

export type AuthFormValues = z.infer<ReturnType<typeof authSchema>>;
