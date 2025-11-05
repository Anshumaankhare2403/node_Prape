const mongo = require('mongoose')

const ProductSchema = new mongo.Schema({
    id:{type:Number,unique:true},
    img: {type:String,required:true},
    title:{type:String,required:true},
    contand:{type:String,required:true},
    createdAt: { type: Date, default: Date.now }

},{timestamps:true})


const product = mongo.model('Product',ProductSchema)

module.exports = product
