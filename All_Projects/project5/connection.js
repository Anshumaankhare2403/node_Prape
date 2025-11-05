const mongo = require('mongoose')

async function Connection(uri) {

    return mongo.connect(uri).then(()=>console.log("MongoDB is connected ")).catch(err=>console.log(`MongoDb is not connected Error : ${err}`))
    
}

module.exports  = {
    Connection
}