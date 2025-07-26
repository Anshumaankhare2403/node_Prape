import fs from 'fs';
import fetch from 'node-fetch';
import { json } from 'stream/consumers';

const url = "https://official-joke-api.appspot.com/random_joke";


const joke = async (url) => {
    const arr = []
    const res = await fetch(url);
    const data = await res.json();
    console.log("Here is randome Joke Generators");
    console.log(`Setup: ${data.setup}`);
    arr.push(data);
    console.log(arr);
    fs.appendFileSync("Jokes.json", JSON.stringify(arr, null, 2))
    console.log(`Punchline: ${data.punchline}`)

}

joke(url);