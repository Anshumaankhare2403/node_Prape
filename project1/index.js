const http = require("http")
const url =  require("url")
const express = require("express")

const app = express()

app.get('/',(req,res)=>{
    return res.end("home page ")
})

app.get('/user',(req,res)=>{
    return res.end("user page ")
})



app.listen(8000,()=>console.log("server is started"))

