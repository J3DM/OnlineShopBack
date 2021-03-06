const SaleActions= require("./SaleActions")
const UserActions= require("../user/UserActions")
const ProductActions= require("../products/ProductActions")

const mongoose = require('mongoose')

module.exports={
    CreateSale:async (req,res)=>{
        var newSale=null
        var session = await mongoose.startSession()
        session.startTransaction()
        SaleActions.Create(req,session)
        .then(
            (creationResponse)=>{
                if(!creationResponse) throw {msg:"no sale created",statCode:400}
                newSale=creationResponse
                return UserActions.ClearShoppingList(req)
            }
        )
        .then(
            async(userResponse)=>{
                if(!userResponse) throw {msg:"no sale created",statCode:400}
                await session.commitTransaction()
                await session.endSession()
                res.status(200).json({
                    sale:newSale,
                    user:userResponse
                })
            }
        )
        .catch(
            async (err)=>{
                await session.abortTransaction()
                await session.endSession()
                if (err.statCode){
                    res.status(err.statCode).json({error:err.msg})
                }else{
                    res.status(400).json({error:err})
                } 
            }
        )
    },
    FindSale:(req,res)=>{
        SaleActions.Find(req)
        .then(
            (foundSale)=>{
                if(!foundSale) throw {msg:"no sale found",statCode:400}
                res.status(200).json({
                    sale:foundSale
                })
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
    UserSales:(req,res)=>{
        SaleActions.User(req)
        .then(
            (foundSales)=>{
                if(!foundSales) throw {msg:"no sale found",statCode:400}
                res.status(200).json({
                    userSales:foundSales
                })
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
    VerifySale:(req,res)=>{
        console.log("Verify body",req.body)
        SaleActions.Verify(req)
        .then(
            async(updatedSale)=>{
                console.log("verify result",updatedSale)
                if(!updatedSale) throw {msg:"no sale found",statCode:400}
                if(updatedSale.state==="REJECTED"){
                    var productList= updatedSale.products
                    console.log(productList)
                    productList.map(async(product)=>await ProductActions.UpdateStock(product._id,product.quantity))
                    
                }
                res.status(200).json({
                    sale:updatedSale
                })
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