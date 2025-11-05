const mongo = require('mongoose')

const schema = new mongo.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    URL:{
        type:String,
        required:true
    },
    History:[{timestamps:{type:Number}}]
},{timestamps:true})


const URL = mongo.model('urlgen',schema)

module.exports = URL