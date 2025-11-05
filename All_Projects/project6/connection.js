const mongo = require('mongoose')

async function Connect(url) {

    return mongo.connect(url).then(()=>console.log("connected ")).catch(err=>console.log('err'))
    
}


module.exports = Connect