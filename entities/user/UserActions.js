const User= require("./UserModel")

module.exports={
    Create:(req)=>{
        var newUser= new User(
            {
                _id:req.body._id,
                name:req.body.name,
                password:req.body.password,
                email:req.body.email,
                shoppingCart:req.body.shoppingCart
            }
        )
        return newUser.save()
    },
    User:(req)=>{
        return User.findById(req.query._id)
    },
    Login:(req)=>{
        return User.findOne({email:req.body.email,password:req.body.password})
    },
    Update:(req)=>{
        var updateUser={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            shoppingCart:req.body.shoppingCart
        }
        return User.findByIdAndUpdate(req.body._id,{$set:updateUser},{new:true})
    }
}