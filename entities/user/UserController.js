const UserActions=require("./UserActions")

module.exports={

    CreateUser:(req,res)=>{
        UserActions.Create(req)
        .then(
            (newUser)=>{
                if (!newUser) throw {msg:"No user created",statCode:400}
                res.status(200).json({product:newUser})
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
                res.status(200).json({product:foundUser})
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
                res.status(200).json({product:foundUser})
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
            (updateUser)=>{
                if (!updateUser) throw {msg:"No user updated",statCode:400}
                res.status(200).json({product:updateUser})
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
}