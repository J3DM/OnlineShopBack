const ProductActions= require("./ProductActions")

module.exports = {

    CreateProduct: (req,res)=>{
        ProductActions.Create(req)
        .then(
            (newProduct)=>{
                if (!newProduct) throw {msg:"No product created",statCode:400}
                res.status(200).json({product:newProduct})
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

    UpdateProduct: (req,res)=>{
        ProductActions.Update(req)
        .then(
            (updatedProduct)=>{
                if (!updatedProduct) throw {msg:"No product updated",statCode:400}
                res.status(200).json({product:updatedProduct})
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

    GetProduct: (req,res)=>{
        ProductActions.FindThis(req)
        .then(
            (foundProduct)=>{
                if (!foundProduct) throw {msg:"No product found with id "+req.params.id,statCode:404}
                res.status(200).json({product:foundProduct})
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
    DeleteProduct:(req,res)=>{
        ProductActions.Delete(req)
        .then(
            (deletedProduct)=>{
                if (!deletedProduct) throw {msg:"No product found to delete",statCode:400}
                res.status(200).json({product:deletedProduct})
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
    ListProducts:(req,res)=>{
        ProductActions.List()
        .then(
            (productList)=>{
                if(!productList)throw{msd:"No products found",statCode:404}
                res.status(200).json({products:productList})
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
    CategoryProducts:(req,res)=>{
        ProductActions.FilterCategory(req)
        .then(
            (productList)=>{
                if(!productList)throw{msd:"No products found",statCode:404}
                res.status(200).json({products:productList})
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
    UpdateStock:(req,res)=>{
        ProductActions.Stock(req)
        .then(
            (updatedProduct)=>{
                if (!updatedProduct) throw {msg:"No product updated",statCode:400}
                res.status(200).json({product:updatedProduct})
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
    FilterName:(req,res)=>{
       ProductActions.Name(req)
       .then(
        (productList)=>{
            if(!productList)throw{msd:"No products found",statCode:404}
            res.status(200).json({products:productList})
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
    ListAllProducts:(req,res)=>{
        ProductActions.ListAll()
        .then(
            (productList)=>{
                if(!productList)throw{msd:"No products found",statCode:404}
                res.status(200).json({products:productList})
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
    ActivateProduct:(req,res)=>{
        ProductActions.Activate(req)
        .then(
            (activatedProduct)=>{
                if (!activatedProduct) throw {msg:"No product found to delete",statCode:400}
                res.status(200).json({product:activatedProduct})
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