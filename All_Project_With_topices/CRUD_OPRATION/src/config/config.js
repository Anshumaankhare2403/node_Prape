const mongoose = require("mongoose");


async function ConnectDB(uri) {
    try {
        await mongoose.connect(uri);
        console.log("DB IS CONNECTED ");
    } catch (error) {
        console.log("ERROR TO CONNECT DB = ",error.message);
    }
}

// function ConnectDB(uri) {
//     mongoose.connect(uri).then(()=>console.log("DB IS CONNECTED ")).catch((err)=>console.log("ERROR=  ",err));
// }
module.exports = ConnectDB;