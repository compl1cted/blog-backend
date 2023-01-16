import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import cors from "cors"
import { ConnectToDb } from "./config/database.config";
import { AuthRoute } from "./routes/auth.route";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../env/.env") });

const app = express();
const PORT = process.env.API_PORT || 7000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV
}));
app.use("/auth", AuthRoute);
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