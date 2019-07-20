const UserActions=require("./UserActions")

module.exports={

    CreateUser:(req,res)=>{
        UserActions.Create(req)
        .then(
            (newUser)=>{
                if (!newUser) throw {msg:"No user created",code:400}
                res.status(200).json({product:newUser})
            }
        )
        .catch(
            (err)=>{
                if (err.code){
                    res.status(err.code).json({error:err.msg})
                }else{
                    res.status(400).json({error:err})
                } 
            }
        )    
    }
}