const UserActions=require("./UserActions")

module.exports={

    CreateUser:(req,res)=>{
        UserActions.Create(req)
        .then(
            (newUser)=>{
                if (!newUser) throw {msg:"No user created",statCode:400}
                res.status(200).json({user:newUser})
            }
        )
        .catch(
            (err)=>{
                if (err.statCode){
                    res.status(err.statCode).json({error:err.msg})
                }else{
                    res.status(400).json({error:err})
                } 
            }
        )    
    },
    GetUser:(req,res)=>{
        UserActions.User(req)
        .then(
            (foundUser)=>{
                if (!foundUser) throw {msg:"No user found",statCode:404}
                res.status(200).json({user:foundUser})
            }
        )
        .catch(
            (err)=>{
                if (err.statCode){
                    res.status(err.statCode).json({error:err.msg})
                }else{
                    res.status(400).json({error:err})
                } 
            }
        )
    },
    LoginUser:(req,res)=>{
        UserActions.Login(req)
        .then(
            (foundUser)=>{
                if (!foundUser) throw {msg:"No user found",statCode:404}
                res.status(200).json({user:foundUser})
            }
        )
        .catch(
            (err)=>{
                if (err.statCode){
                    res.status(err.statCode).json({error:err.msg})
                }else{
                    res.status(400).json({error:err})
                } 
            }
        )
    },
    UpdateUser:(req,res)=>{
        UserActions.Update(req)
        .then(
            (updatedUser)=>{
                if (!updatedUser) throw {msg:"No user updated",statCode:400}
                res.status(200).json({user:updatedUser})
            }
        )
        .catch(
            async (err)=>{
                if (req.body._id){
                    oldUser=await UserActions.GetId(req.body._id)
                    res.status(404).json({user:oldUser,errMsg:err.msg})    
                }else{
                    res.status(400).json({error:err})
                } 
            }
        )    
    },
    UpdateCart:(req,res)=>{
        UserActions.ValidateUpdateCart(req)
        .then(
            (isValid)=>{
                if (!isValid) throw {msg:"Update cart action notr allowed",statCode:400}
                if(req.body.action==="ADD"){
                    return UserActions.AddProductCart(req)
                }else if (req.body.action==="REMOVE"){
                    return UserActions.RemoveProductCart(req)
                }
            }
        )
        .then(
            (updatedUser)=>{
                if (!updatedUser) throw {msg:"No user updated",statCode:400}
                res.status(200).json({user:updatedUser})
            }
        )
        .catch(
            (err)=>{
                if (err.statCode){
                    res.status(err.statCode).json({error:err.msg})
                }else{
                    res.status(400).json({error:err})
                } 
            }
        )
    },
    UpdateRole:(req,res)=>{
        UserActions.Role(req)
        .then(
            (updatedUser)=>{
                console.log("Result:",updatedUser)
                if (!updatedUser) throw {msg:"No user updated",statCode:400}
                res.status(200).json({user:updatedUser})
            }
        )
        .catch(
            (err)=>{
                if (err.statCode){
                    res.status(err.statCode).json({error:err.msg})
                }else{
                    res.status(400).json({error:err})
                } 
            }
        )    
    }
}