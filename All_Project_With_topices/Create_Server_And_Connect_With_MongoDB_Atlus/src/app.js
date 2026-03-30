const express  = require("express");
const ConnectDB = require("./conf/confDB.js");
require("dotenv").config();
const app = express();

ConnectDB(process.env.DBurl);

module.exports = app;
