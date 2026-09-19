const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get("/breeds", async (req, res) => {
    try {
        const response = await fetch("https://dogapi.dog/api/v2/breeds");
        const data = await response.json();
        console.log(data)
        res.json(data); // send to client
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});



app.listen(3000, () => console.log("server is started !"));
