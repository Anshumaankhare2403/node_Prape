const allDownloader = require("all-downloader");
const url = "https://xhamster1.desi/videos/ero-xhgOF8J";
async function run(url) {
    const result = await allDownloader.parse(url);
    console.log(result);
}

run(url);