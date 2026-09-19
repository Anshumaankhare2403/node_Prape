const express  = require("express");
const connectDB = require("./config/Dbconfig.js");
const app = express();
connectDB();



module.exports=app;
