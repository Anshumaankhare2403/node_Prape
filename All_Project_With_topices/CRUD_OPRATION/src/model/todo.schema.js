const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
        title:String,
        description:String,
        task:String
    },{timestamps: true})


const TODO = mongoose.model("TodoList", TodoSchema);

module.exports = TODO;






