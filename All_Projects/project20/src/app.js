const express = require("express");


const app = express();
app.use(express.json());
const data =[];
app.get("/",(req,res)=>{
    res.send("Its Anshumaan Khare");
})

app.post("/home",(req,res)=>{
    const {name,age,work,salary} = req.body;
    const nodes = {"name":name,
        "age":age,
        "work":work,
        "salary":salary
    };
    data.push(nodes);

    res.send(nodes);
    console.log(nodes);
    console.log("data=",data);

});

app.put("/home", (req, res) => {
    const { name, age, work, salary } = req.body;

    const index = data.findIndex(item => item.name === name);

    if (index !== -1) {
        data[index] = { name, age, work, salary };
        res.send(data[index]);
    } else {
        res.send("User not found");
    }

    console.log("data=", data);
});

app.delete("/home", (req, res) => {
    if (data.length > 0) {
        const removed = data.pop();
        res.send(removed);
    } else {
        res.send("No data to delete");
    }

    console.log("data=", data);
});



module.exports=app;



