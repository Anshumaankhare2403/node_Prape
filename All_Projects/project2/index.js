const express = require("express")
const data = require("./data.json")
const fs = require("fs")
const app = express()
const PORT = 6969

// middlewere - plugin

app.use(express.urlencoded({ extended: false }))

app.use((req,res,next)=>{
    fs.appendFile("./log.text",`${Date.now()}: ${req.method}: ${req.path} \n`,(err,data)=>{

        next()
    })
})


// routes 
app.get("/api/", (req, res) => {
    res.setHeader("name","Sex With girl with big boobs with cute face")
    console.log(req.headers)

    return res.json(data)

})

// app.get("/api/:id",(req,res)=>{
//     const id = Number(req.params.id)
//     const user = data.find((user)=> user.id === id)
//     return res.json(user)
// }) 

app
    .route("/api/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = data.find((user) => user.id === id)
        return res.json(user)
    })
    .patch((req, res) => {
        const uid = Number(req.body.id)
        const updata = data.find(u=>u.id===uid)
        if(!updata){
            return res.status(404).json({error:"user not found "})
        }

        const {name,email} = req.body
        if(name !== undefined) updata.first_name = name
        if(email !== undefined) updata.email = email

        res.json(data)
    })
    .delete((req, res) => {
        // const uid = Number(req.body.id)
        // const newdata = data.filter(data => data.id !== uid)
        data.pop()
        fs.writeFile("./data.json", JSON.stringify(data), (err, data) => {
            return res.json({ statusbar: "Success delet" })
        })
    })

app.post("/api", (req, res) => {
    const body = req.body
    data.push({ ...body, id: data.length + 1 })
    fs.writeFile("./data.json", JSON.stringify(data), (err, data) => {

        return res.status(201).json({ statusbar: "Success", body })
    })
})

app.listen(PORT, console.log(`server started at server ${PORT}`))

