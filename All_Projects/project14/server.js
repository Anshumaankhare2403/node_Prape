import express from "express";
import fs from "fs";

import dotenv from "dotenv";
import connectionDB from './connection/connection.js';
import router from "./router/user_router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.use("/", router);




app.listen(PORT, () => { console.log(`Server is started on http://localhost:${PORT}`) });