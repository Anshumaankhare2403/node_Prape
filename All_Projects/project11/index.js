import fs from 'fs';
import fetch from 'node-fetch';

const url = "https://official-joke-api.appspot.com/random_joke";

const joke = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log("Here is a Random Joke:");
        console.log(`Setup: ${data.setup}`);
        console.log(`Punchline: ${data.punchline}`);

        // Save the joke to a file
        fs.writeFileSync("Jokes.json", JSON.stringify(data, null, 2));
        console.log("✅ Joke saved to Jokes.json");
    } catch (err) {
        console.error("❌ Error fetching joke:", err.message);
    }
};

joke(url);