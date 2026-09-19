import express from "express";
import  ConnectionDB  from "./connection/connectionDB.js";
import dotenv from "dotenv";
import { login, register } from "./controller/authController.js";
dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);


const uri = process.env.MYDB;
ConnectionDB(uri);



export default app;

