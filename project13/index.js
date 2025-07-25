import express from "express";
import fs from "fs";
import { PORT } from "./env.js";

// const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
    return res.status(200).send("<h1>Hello every one </h1");
});

app.listen(PORT, () => console.log(`Server Started at http://localhost:${PORT} `));


