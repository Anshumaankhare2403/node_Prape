const mongo = require('mongoose')

const Signin = new mongo.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    createdAt: { type: Date, default: Date.now }

},{timestamps:true})


const singin = mongo.model('Singin',Signin)

module.exports = singin
