const express= require("express")
const app=express()

const ProductController=require("./ProductController")

app.post("",ProductController.CreateProduct)
app.put("",ProductController.UpdateProduct)
app.get("/list",ProductController.ListProducts)
app.get("/category",ProductController.CategoryProducts)
app.get("",ProductController.GetProduct) 
app.delete("",ProductController.DeleteProduct)


module.exports = app