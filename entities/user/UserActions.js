const User= require("./UserModel")

module.exports={
    Create:(req)=>{
        var newUser= new User(
            {
                _id:req.body._id,
                name:req.body.name,
                password:req.body.password,
                email:req.body.email,
                role:req.body.role,
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
    },
    ValidateUpdateCart:(req)=>{
        var promise= new Promise((res,rej)=>
            {
                if (["ADD","REMOVE"].includes(req.body.action)){
                    res(true) 
                }else{
                    rej("Action not allowed")
                }
            }
        )
        return promise
    },
    AddProductCart:(req)=>{
        return User.findById(req.body._id)
        .then(
            (foundUser)=>{
                var updated=false
                foundUser.shoppingList.forEach(product=>{
                    if (product._id==req.body.product){
                        updated=true
                        product.quantity=product.quantity+parseInt(req.body.quantity)
                    }
                })
                if(!updated){
                    foundUser.shoppingList.push({
                        _id:req.body.product,
                        quantity:req.body.quantity
                    })
                }
                return User.findByIdAndUpdate(foundUser._id,{$set:foundUser},{new:true})
            }
        )
    },
    RemoveProductCart:(req)=>{
        return User.findById(req.body._id)
        .then(
            (foundUser)=>{
                newList=foundUser.shoppingList.filter(product=>product._id!=req.body.product)
                foundUser.shoppingList=newList
                return User.findByIdAndUpdate(foundUser._id,{$set:foundUser},{new:true})
            }
        )
    }
}