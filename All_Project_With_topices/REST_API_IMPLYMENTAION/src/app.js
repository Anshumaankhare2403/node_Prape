const express = require("express");
const restapi  = require("./router/Restapi.js");
const app = express();

app.use(express.json()); 
app.use("/", restapi);  



module.exports = app;
