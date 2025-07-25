import shortid from "shortid";
import connectDB from "../connection/connection.js";
export const urlshrtner = async (url) => {
    try {
        const shortUrl = shortid.generate().slice(0, 8)
        const db = await connectDB();
        const qurey = `INSERT INTO urlShortners (url, urlShort) VALUES (?, ?)`
        const [result] = await db.execute(qurey, [url, shortUrl])
        console.log("✅ Inserted:", result.insertId);
        return result;
    } catch (error) {
        console.log(error)
    }
}

export const urlshrtnerget = async () => {
    try {

        const db = await connectDB();
        const query = `SELECT * FROM urlShortners`;
        const [result] = await db.execute(query)
        console.log("✅ Showdata:");
        return result;
    } catch (error) {
        console.log(error)
    }
}

