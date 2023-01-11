import express = require("express");
import { ConnectToDb } from "./config/database.config";
const app = express();

const PORT = 3000;

const StartServer = () => {
    try {
        app.listen(PORT);
        ConnectToDb();
    } catch (error) {
        console.error(error);
    }
}

StartServer();