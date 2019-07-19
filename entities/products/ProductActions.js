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
    }
}