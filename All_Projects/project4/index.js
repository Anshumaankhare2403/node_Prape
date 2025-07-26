const express = require("express")

const {logsmid} = require('./middleware')
const {connection} = require('./connection')
const Router = require('./routes/todoroutes')


const app = express()
const PORT = 5000
const mURL = 'mongodb://localhost:27017/todoApp'

// medilware
app.use(express.urlencoded({ extended: false }))

app.use(logsmid("log.txt"))

// databases connection 
connection(mURL)

// all this CRUD opration 
app.use("/todolist",Router)

// server listener 
app.listen(PORT, console.log(`Server started at ${PORT}`))
