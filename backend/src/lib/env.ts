import * as z from "zod";
import "dotenv/config";

const envSchema = z.object({
    MONGODB_URI: z.string(),
    PORT: z.coerce.string(),
    NODE_ENV: z.string().default("development"),
    SECRET_KEY: z.string(),
    RESEND_API_KEY: z.string(),
    EMAIL_FROM: z.string(),
});

export const env = envSchema.parse(process.env);
