const express = require("express");
const mongo = require("mongoose");
const PORT = 2424
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = 'mongodb://localhost:27017/cars'

mongo.connect(uri).then(() => console.log("mongoDB is connected ")).catch((err) => console.log("mongoDB is error", err))

const cardata = new mongo.Schema({
    id: { type: Number, required: true },
    carName: { type: String },
    carVersion: { type: String },
    carColor: { type: String },
    carPrice: { type: Number }
})

const Cars = mongo.model("all_Cars", cardata, "all_Cars");







app.get("/", (req, res) => {
    res.status(200).end("Server Started")
})

app.get("/cars", async (req, res) => {
    try {
        const showdb = await Cars.find(); // Fetch all data from "cars" collection
        return res.status(200).json(showdb);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})


app.post("/cars",async (req,res)=>{
    const body = req.body
    if(!body.id || !body.carName || !body.carVersion || !body.carColor || !body.carPrice){
        res.status(400).json({massage:"Pleas enter an fildes" })
    }
    const adddb = await Cars.create({
        id:body.id,
        carName:body.carName,
        carVersion:body.carVersion,
        carColor:body.carColor,
        carPrice:body.carPrice
    })

    console.log(adddb)

    res.status(201).json({massage:'insertion successfull '})


})

app
.route("/cars/:id")
.patch(async (req,res)=>{
    const uid = Number(req.params.id)
    console.log("show UId",uid)
    const data = req.body
    const pdata = await Cars.findOneAndUpdate({id:uid},data,{new:true})
    return res.status(201).json({Cars:pdata})

})
.delete(async (req,res)=>{
    const uid = Number(req.params.id)
    console.log("show UId",uid)
    const data = req.body
    const pdata = await Cars.findOneAndDelete({id:uid})
    return res.status(201).json({Cars:pdata})

})




app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

