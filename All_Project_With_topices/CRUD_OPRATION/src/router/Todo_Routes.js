const express = require("express");
const {handleTodoList}  = require("../controller/Todo_controller.js");
const routes = express();

routes
// .route("/todolist")
.post("/todolist",handleTodoList)


module.exports = routes;