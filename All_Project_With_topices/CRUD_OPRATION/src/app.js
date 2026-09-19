const express  = require("express");
const ConnectDB = require("./config/config.js")
const router = require("./router/Todo_Routes.js");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/auth",router);


ConnectDB(process.env.DBURI);


module.exports = app;

