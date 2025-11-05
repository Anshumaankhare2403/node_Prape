const todo = require('../models/todo')


async function HandelTodoFind(req, res) {
    const showdb = await todo.find()
    res.status(201).json({ todolist: showdb })
}

async function HandelTodoAdd(req, res) {
    const body = req.body
    const adddata = await todo.create({
        id: body.id,
        title: body.title,
        body: body.body,
    })
    res.status(201).json({ massage: "successful added", data: adddata })

}


async function HandelTodoUpdate(req, res) {

const tid = Number(req.params.id)
        const body = req.body
        const up = await todo.findOneAndUpdate({ id: tid }, body)
        res.status(201).json({ massage: "Successfuly update ", todo: up })
}

async function HandelTodoDelet(req, res) {
const tid = Number(req.params.id)
        const del = await todo.findOneAndDelete({ id: tid })
        res.status(201).json({ massage: "data delete successful", todolist: del })

}

module.exports = {
    HandelTodoFind,
    HandelTodoAdd,
    HandelTodoUpdate,
    HandelTodoDelet
}