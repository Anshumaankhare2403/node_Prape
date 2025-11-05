import express from 'express';
import fs from 'fs';
import connectionDB from './connection/connection.js';
import route from './router/userRouter.js';
import { json } from 'stream/consumers';

const app = express();
const PORT = 4000;
const url = "mongodb://localhost:27017/userAuth";


app.use(express.json());
app.use("/", route);


connectionDB(url);


app.listen(PORT, () => console.log(`Server is started in`))