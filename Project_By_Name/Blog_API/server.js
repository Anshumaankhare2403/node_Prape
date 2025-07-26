import express from 'express';
import fs, { lstat } from 'fs';
import dotenv from 'dotenv';
import connectionDB from './connection/connection.js';
import router from './routes/blocRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const url = process.env.DBurl;

app.use(express.json());

connectionDB(url);

app.use("/", router);


app.listen(PORT, () => console.log(`Server Started at localhost:${PORT}`));