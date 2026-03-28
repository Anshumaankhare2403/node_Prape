const express  = require("express");
const {ConnectDB,ConnectDBNew} = require("./conf/DBconf.js");

require('dotenv').config();

const app = express();

ConnectDB(process.env.DB);
ConnectDBNew(process.env.DB);

module.exports = app;
