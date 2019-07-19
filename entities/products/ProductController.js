const ProductActions= require("./ProductActions")

module.exports = {

    CreateProduct: (req,res)=>{
        ProductActions.Create(req)
        .then(
            (newProduct)=>{
                if (!newProduct) throw {msg:"No product created",code:400}
                res.status(200).json({product:newProduct})
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
    },

    UpdateProduct: (req,res)=>{
        ProductActions.Update(req)
        .then(
            (updatedProduct)=>{
                if (!updatedProduct) throw {msg:"No product updated",code:400}
                res.status(200).json({product:updatedProduct})
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
    },

    GetProduct: (req,res)=>{
        ProductActions.FindThis(req)
        .then(
            (foundProduct)=>{
                if (!foundProduct) throw {msg:"No product found with id "+req.params.id,code:404}
                res.status(200).json({product:foundProduct})
            }
        )
        .catch(
            (err)=>{
                var code
                var msg
                if (!err.code){
                    code=500
                    msg=err
                }else{
                    code=err.code
                    msg=err.msg
                }
                res.status(code).json({error:msg})
            }
        )
    },
    DeleteProduct:(req,res)=>{
        ProductActions.Delete(req)
        .then(
            (deletedProduct)=>{
                if (!deletedProduct) throw {msg:"No product found to delete",code:400}
                res.status(200).json({product:deletedProduct})
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
    },
    ListProducts:(req,res)=>{
        ProductActions.List()
        .then(
            (productList)=>{
                if(!productList)throw{msd:"No products found",code:404}
                res.status(200).json({products:productList})
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
    },
    CategoryProducts:(req,res)=>{
        ProductActions.FilterCategory(req)
        .then(
            (productList)=>{
                if(!productList)throw{msd:"No products found",code:404}
                res.status(200).json({products:productList})
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