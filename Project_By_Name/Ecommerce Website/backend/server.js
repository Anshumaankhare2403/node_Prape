
import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import DBconnection from './config/DBconnection.js';
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const url = process.env.MONGO_URI;
DBconnection(url);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


app.listen(PORT, () => console.log("Serve started"));