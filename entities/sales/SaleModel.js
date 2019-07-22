const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saleProduct = new Schema(
    {
        _id:{type:Schema.Types.ObjectId,ref:"Product",required:"Product is needed to create sale product"},
        quantity:{type:Schema.Types.Number,required:"Quantity is needed to create sale product"},
        price:{type:Schema.Types.Number,required:"Price is needed to create sale product"},
    }
)

const saleSchema = new Schema(
    {
        _id:{type:Schema.Types.ObjectId,auto:true},
        user:{type:Schema.Types.ObjectId,ref:"User",required:"User is needed to create a sale"},
        address:{type:Schema.Types.String,required:"Address is needed to create a sale"},
        products:{type:[saleProduct],required:"User is needed to create a sale"},
        totalPrice:{type:Schema.Types.Number,required:"Proce os needed to create a sale"}
    }
)

module.exports = mongoose.model('Sale', saleSchema)