const { default: mongoose } = require("mongoose");
const TODO = require("../model/todo.schema.js");

async function handleTodoList(req, res) {
    try {
        const { title, description, task } = req.body;
        if(!title){
            return res.status(404).json({massage:"title is not found"});
        }
        const data = await TODO.create({
            title,
            description,
            task
        });
        console.log(data);

        res.status(201).json({
            message: "Successful",
            data: data
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


async function handleTodoListget(req,res){
    try {
        const data = await TODO.find({});
        console.log(data);
        res.status(202).json({massage:"get all data",data:data});
        
    } catch (error) {
        res.status(500).json({massage:error.massage});
    }
}


async function handleTodoListDelete(req,res){
    try {
        const {title} = req.body;
        const deletedData = await TODO.findOneAndDelete({ title });
        if (!deletedData) {
            console.log("Error: data not found");
            return res.status(404).json({ message: "Data not found" });
        }
         res.status(200).json({
            message: "Successfully deleted",
            data: deletedData
        });
        
    } catch (error) {
        res.status(500).json({massage:error.massage});
        console.log(error);
    }
}

async function handleTodoListUpdate(req,res) {
    try {
        const {title, description, task}  = req.body;
        if(!title){
            return res.status(404).json({massage:"Title is require "});
        }
        const updatedfeilds = {};
        if(description) updatedfeilds.description = description;
        if(task) updatedfeilds.task = task;
        const updataData = await TODO.findOneAndUpdate({title},updatedfeilds,{new:true,runValidators:true});
        if(!updataData){
            return res.status(404).json({massage:"TODO NOT Found "});
        }
        res.status(200).json({massage:"succssefuly updated ",updataData:updataData});
    } catch (error) {

        res.status(500).json({massage:error.massage});
        
    }
}




module.exports = { handleTodoList,handleTodoListget,handleTodoListDelete,handleTodoListUpdate };