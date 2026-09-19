const express = require("express");
const {handleTodoList,handleTodoListget,handleTodoListDelete,handleTodoListUpdate}  = require("../controller/Todo_controller.js");
const routes = express();

routes
.route("/todolist")
.get(handleTodoListget)
.post(handleTodoList)
.delete(handleTodoListDelete)
.patch(handleTodoListUpdate)

module.exports = routes;