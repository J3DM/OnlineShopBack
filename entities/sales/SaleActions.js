const Sale= require("./SaleModel")
const UserActions= require("../user/UserActions")
const ProductActions=require("../products/ProductActions")

function giveProductFromShoppingList(productList,id){
    return productList.filter((product)=> product._id==""+id)
}

module.exports={
    Create:(req,session)=>{
        return UserActions.User(req)
            .then(
                async (foundUser)=>{
                    if(!foundUser) throw {msg:"No user found with id "+req.body._id,statCode:400} 
                    var boughtProducts=[]
                    price=0
                    console.log(foundUser.shoppingList)
                    foundUser.shoppingList.forEach(async(product)=>{
                        console.log(product)
                        var prod=await ProductActions.UpdateStock(product,-1)
                        console.log(prod)
                    })

                    var fullProductDetails=await ProductActions.DetailsFrom(foundUser.shoppingList)
                    fullProductDetails.forEach((detailedProduct)=>{
                        var productLine=giveProductFromShoppingList(foundUser.shoppingList,detailedProduct._id)[0]
                        price+=detailedProduct.price*productLine.quantity
                        var line={
                            _id:detailedProduct._id,
                            quantity:productLine.quantity,
                            price:detailedProduct.price
                        }
                        boughtProducts.push(line)
                    })
                    newSale= new Sale(
                        {
                            user:foundUser._id,
                            address:req.body.address,
                            products:boughtProducts,
                            totalPrice:price
                        }
                    )
                    return Sale.insertMany([newSale]/*,{session:session}*/)
                }
            ).catch(
                (err)=>{
                    throw err
                }
            )
    },
    Find:(req)=>{
        return Sale.findById(req.query.sale)
    },
    User:(req)=>{
        return Sale.find({user:req.query.user})
    },
    Verify:(req)=>{
        return Sale.findOneAndUpdate(req.body._id,{$set:{state:req.body.state}})
    },
    Delete:(req)=>{
        return Sale.findOneAndDelete(req.body._id)
            .then(
                (deletedSale)=>{
                    if(!deletedSale) throw {msg:"No user found with id "+req.body._id,statCode:400} 
                    console.log(deletedSale.shoppingList)
                    deletedSale.shoppingList.forEach(async(product)=>{
                        console.log(product)
                        var prod=await ProductActions.UpdateStock(product,1)
                        console.log(prod)
                    })
                    return deletedSale
                }
            )
    }
}