import { urlshrtner, urlshrtnerget } from "../models/urlModels.js";

export const handelUrlShortner = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        const urldata = await urlshrtner(url);

        res.status(201).json({
            message: "URL shortened successfully",
            data: {
                original: url,
                short: urldata.shortUrl,
            },
        });

    } catch (error) {
        console.error("❌ Error in handelUrlShortner:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

}


export const handelGetUrlShortner = async (req, res) => {
    try {
        const getAllurl = await urlshrtnerget(); // This is an array of rows from MySQL

        res.status(200).json({
            message: "All shortened URLs",
            data: getAllurl
        });

    } catch (error) {
        console.error("❌ Error in handelGetUrlShortner:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};