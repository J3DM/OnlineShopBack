const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartItem= new Schema(
    {
        _id:{type:Schema.Types.ObjectId, ref:"Product"},
        name:{type:Schema.Types.String},
        quantity:{type:Schema.Types.Number,}
    }
)

const validRoles = {
    values: ['ADMIN', 'MANAGER', 'CUSTOMER'],
    message: '{VALUE} is not a valid role'
}

const userSchema = new Schema(
    {
        _id:{type:Schema.Types.ObjectId,auto:true},
        name:{type:Schema.Types.String,required:"User name is required"},
        password:{type:Schema.Types.String,required:"User password is required"},
        email:{type:Schema.Types.String,unique:true,required:"Unique user email is required"},
        role:{type: Schema.Types.String, enum: validRoles, required: 'User role needed' },
        shoppingList:[cartItem]
    }
)

module.exports = mongoose.model('User', userSchema)