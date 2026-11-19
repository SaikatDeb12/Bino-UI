import express from "express";
import { env } from "./lib/env";
import { authRouter } from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/check", () => {
    console.log("server is running...");
});
app.use("/api/v1/auth", authRouter);

app.listen(env.PORT, () => {
    console.log(`server running on http://localhost:${env.PORT}`);
});
