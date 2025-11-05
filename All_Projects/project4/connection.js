const mongo = require("mongoose")

async function connection(uri) {

    return mongo
        .connect(uri)
        .then(() => console.log("mongoDB is connected "))
        .catch((err) => console.log("mongoDB is not connected err = ", err))


}


module.exports = {
    connection,
}
