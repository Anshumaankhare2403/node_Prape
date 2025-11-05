const express = require('express')
const {Connection}= require('./connection') 
const Routers = require('./routers/url_router')
const router = require('./routers/url_router')
// const path =  require('path')
const app = express()
const PORT = 2003
const uri = "mongodb://localhost:27017/url_genrator"

// Set view engine to EJS

app.set('view engine','ejs')
app.set('views', './views')


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'))


// MongoDB connection
Connection(uri)


// Routers over here
app.use('/url',Routers)

    


app.listen(PORT,console.log(`server is started at PROT ${PORT}`))