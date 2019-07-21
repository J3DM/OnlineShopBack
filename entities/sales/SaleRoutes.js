const express= require("express")
const app=express()

const SaleController= require("./SaleController")

app.post("",SaleController.CreateSale)
app.get("/user",SaleController.UserSales)
app.get("",SaleController.FindSale)

module.exports=app