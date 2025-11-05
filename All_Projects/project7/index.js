const express = require("express");
const allDownloader = require("all-downloader");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { formats: null });
});

app.post("/", async (req, res) => {
    const url = req.body.videoUrl;
    try {
        const result = await allDownloader.parse(url);
        res.render("index", { formats: result.formats });
    } catch (err) {
        console.error("Error parsing video:", err.message);
        res.render("index", { formats: [] });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
