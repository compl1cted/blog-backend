import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import { ConnectToDb } from "./config/database.config";
import { AuthRoute } from "./routes/auth.route";
import { ErrorMiddleware } from "./middleware/error.middleware";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", AuthRoute);
app.use(ErrorMiddleware);

const StartServer = () => {
    try {
        app.listen(PORT);
        ConnectToDb();
    } catch (error) {
        console.error(error);
    }
}

StartServer();