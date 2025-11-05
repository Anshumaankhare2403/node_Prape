import express from "express";


import dbConnection from "./connection/dbConnection.js";
import routers from "./router/userRoutes.js";



const app = express();
const PORT = 3000;
const url = "mongodb://localhost:27017/AuthUserforAllAuth";

app.use(express.json());
// DB is connected 
dbConnection(url)


app.use("/", routers);




app.listen(PORT, console.log("Server is Started"));