const mongoose = require("mongoose");

async function ConnectDB(url) {
    await mongoose.connect(url)
    .then(() => console.log("Connect DB"))
    .catch((err) => console.log("Not Connect DB"));
}

async function ConnectDBNew(url) {
    try {
        await mongoose.connect(url);
        console.log("New Way Connect DB ");
        
    } catch (error) {
        console.error("err = ",error);   
    }
}

module.exports ={ ConnectDB, ConnectDBNew};
