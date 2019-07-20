const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartItem= new Schema(
    {
        product:{type:Schema.Types.ObjectId, ref:"Product"},
        quantity:{type:Schema.Types.Number,}
    }
)

const userSchema = new Schema(
    {
        _id:{type:Schema.Types.ObjectId,auto:true},
        name:{type:Schema.Types.String,required:"User name is required"},
        password:{type:Schema.Types.String,required:"User password is required"},
        email:{type:Schema.Types.String,unique:true,required:"Unique user email is required"},
        shoppingList:[cartItem]
    }
)

module.exports = mongoose.model('User', userSchema)