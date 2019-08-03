const express= require("express")
const app=express()

const ProductController=require("./ProductController")

app.post("",ProductController.CreateProduct)
app.put("/stock",ProductController.UpdateStock)
app.put("",ProductController.UpdateProduct)
app.get("/list",ProductController.ListProducts)
app.get("/listAll",ProductController.ListAllProducts)
app.get("/category",ProductController.CategoryProducts)
app.get("/name",ProductController.FilterName)
app.get("",ProductController.GetProduct) 
app.delete("",ProductController.DeleteProduct)


module.exports = app