import express from "express"
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";

const uri = process.env.MYDB;

const app = express();

connectDB(uri);

export default app ;
