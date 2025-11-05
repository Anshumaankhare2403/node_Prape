const mongo = require("mongoose")

// todoList schema
const todoSchema = new mongo.Schema({
    id: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    body: { type: String },

})

const todo = mongo.model("todolist", todoSchema, "todolist");

module.exports = todo