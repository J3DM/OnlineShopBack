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
        return Product.findByIdAndDelete(req.query.id)
    },
    List:()=>{
        return Product.find()
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
    Stock:(req)=>{
        return Product.findByIdAndUpdate(req.query._id,{$inc:{quantity:(parseInt(req.body.quantity))}},{new:true})
    },
    Name:(req)=>{
        return Product.find({name:{$regex:".*"+req.query.name+".*",$options:"i"}})
    }
}