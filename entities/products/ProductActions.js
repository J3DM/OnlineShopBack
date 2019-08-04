const Product= require("./ProductModel")

module.exports={
    Create:(req)=>{
        newProduct= new Product(
            {
                _id:req.body._id,
                name:req.body.name,
                category:req.body.category,
                price:req.body.price,
                quantity:req.body.quantity,
                description:req.body.description,
                image:req.body.image
            }
        )
        return newProduct.save()
    },
    Update:(req)=>{
        updateDocument={
            category:req.body.category,
            price:req.body.price,
            quantity:req.body.quantity,
            description:req.body.description,
            image:req.body.image
        }
        return Product.findByIdAndUpdate(req.body._id,{$set:updateDocument},{new:true})
    },
    FindThis:(req)=>{
        return Product.findById(req.query.id)
    },
    Delete:(req)=>{
        return Product.findByIdAndUpdate(req.query.id,{$set:{state:"DELETED"}},{new:true})
    },
    List:()=>{
        return Product.find({state:{$ne:"DELETED"}})
    },
    FilterCategory:(req)=>{
        return Product.find({category:req.query.cat})
    },
    UpdateStock:(product,value/*,session*/)=>{
        console.log(product)
        return Product.findOneAndUpdate(product._id,{$inc:{quantity:(product.quantity*(value))}})/*.session(session)*/
    },
    DetailsFrom:(productList)=>{
        arrayIds=[]
        productList.forEach(product=>{
            arrayIds.push(product._id)
        })
        return Product.find({_id:{$in:arrayIds}})
    },
    UpdateStock:(_id,value)=>{
        return Product.findByIdAndUpdate(_id,{$inc:{quantity:value}},{new:true})
    },
    Stock:(req)=>{
        return Product.findByIdAndUpdate(req.query._id,{$inc:{quantity:(parseInt(req.body.quantity))}},{new:true})
    },
    Name:(req)=>{
        return Product.find({name:{$regex:".*"+req.query.name+".*",$options:"i"}})
    },
    ListAll:(req)=>{
        return Product.find()
    },
    Activate:(req)=>{
        return Product.findByIdAndUpdate(req.query.id,{$set:{state:"ACTIVE"}},{new:true})
    }
}