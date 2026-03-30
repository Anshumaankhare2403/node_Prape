const mongoose = require("mongoose");


async function ConnectDB(url) {
    try {
        await mongoose.connect(url);
        console.log("DB Connected ");

        
    } catch (error) {
        console.log("DB NOT Connected",error.message);
    }
    
}


module.exports = ConnectDB;
