const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema= new Schema({
    _id:{type:Schema.Types.ObjectId,auto:true},
    name:{type:Schema.Types.String,unique:true,required:"Unique product name is required"},
    category:{type:Schema.Types.String,required:"Product category is required"},
    price:{type:Schema.Types.Number,required:"Product price is required"},
    quantity:{type:Schema.Types.Number,required:"Product quantity is required"},
    description:{type:Schema.Types.String,required:"Product description is required"},
    image:{type:Schema.Types.String,required:"Product image is required"},
    state:{type:Schema.Types.String, default:"ACTIVE"}
})

module.exports = mongoose.model('Product', productSchema)