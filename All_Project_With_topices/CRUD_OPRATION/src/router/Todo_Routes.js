const express = require("express");
const {handleTodoList,handleTodoListget,handleTodoListDelete}  = require("../controller/Todo_controller.js");
const routes = express();

routes
.route("/todolist")
.get(handleTodoListget)
.post(handleTodoList)
.delete(handleTodoListDelete)

module.exports = routes;