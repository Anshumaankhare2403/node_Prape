const express = require("express")
const { HandelTodoFind,HandelTodoAdd,HandelTodoUpdate,HandelTodoDelet } = require('../controllers/todo')


const router = express.Router()
router
    .route("/")
    .get(HandelTodoFind)
    .post(HandelTodoAdd)

router
    .route("/:id")
    .patch(HandelTodoUpdate)
    .delete(HandelTodoDelet)


module.exports = router 