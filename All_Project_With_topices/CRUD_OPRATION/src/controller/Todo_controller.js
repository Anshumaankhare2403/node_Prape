const TODO = require("../model/todo.schema.js");

async function handleTodoList(req, res) {
    try {
        const { title, description, task } = req.body;

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

module.exports = { handleTodoList };