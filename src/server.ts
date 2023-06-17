import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import { ConnectToDb } from "./database/database.config";
import { ErrorMiddleware } from "./errors/error.middleware";
import dotenv from "dotenv";
import path from "path";
import { ApiRouter } from "./api.router";

dotenv.config({ path: path.resolve(__dirname, "../env/.env") });

const app = express();
const PORT = process.env.API_PORT || 7000;

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api", ApiRouter);
app.use(ErrorMiddleware);

const StartServer = () => {
    try {
        app.listen(PORT, () => console.log("Server started on port: " + PORT));
        ConnectToDb();
    } catch (error) {
        console.error(error);
    }
}

StartServer();