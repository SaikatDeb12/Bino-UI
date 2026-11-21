import express from "express";
import { env } from "./lib/env";
import { authRouter } from "./routes/auth";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/check", () => {
    console.log("server is running...");
});
app.use("/api/v1/auth", authRouter);

async function main() {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log("Mongodb connected");
        app.listen(env.PORT, () => {
            console.log(`server running on http://localhost:${env.PORT}`);
        });
    } catch (error) {
        console.log("failed to start server!");
    }
}
main();
