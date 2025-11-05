import express from "express";
import fs from 'fs';
import dotenv from "dotenv";
import router from "./routes/all_routes.js"
import connection from "./connections/connection.js";
import { authMiddleware } from "./middleware/auth_singin.js";


dotenv.config({ debug: true });

const app = express();
const PROT = process.env.PORT;
const url = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;



if (!JWT_SECRET) {
    console.warn("⚠️ JWT_SECRET is missing. Check your .env file.");
}
console.log({
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET ? "✔️ JWT_SECRET loaded" : "❌ JWT_SECRET missing"
});

// app.use(express.urlencoded({ extended: true }));
app.use(express.json())



app.use("/", router);

connection(url);


app.get("/profile", authMiddleware, (req, res) => {
    res.send(`Welcome, your user ID is ${req.userId}`);
});

app.listen(PROT, () => console.log(`Server is started at http://localhost:${PROT}`));