const fs = require("fs");
const path = require('path');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startfun() {
    rl.question(`Enter the folder name : `, handleFile);


}

function handleFile(data) {
    let pathdata = path.join(__dirname, String(data))
    try {
        fs.mkdirSync(pathdata, { recursive: true })


        rl.question(`Enter the file name : `, (ndata) => {
            let pathdatas = path.join(__dirname, `./${data}`, ndata);
            try {
                fs.writeFileSync(pathdatas, "data")
                console.log("success");

            } catch (error) {
                console.log(error)
            }
        });


    } catch (error) {
        console.log(error)
    }
    startfun();

}

function handleFileData(data) {

}



startfun();