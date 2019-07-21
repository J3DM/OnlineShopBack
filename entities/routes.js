const express= require("express")
const app=express()

app.use("/product",require("./products/ProductRoutes"))
app.use("/user",require("./user/UserRoutes"))
app.use("/sale",require("./sales/SaleRoutes"))

app.get("/ping",(req,res)=>{res.status(200).json({message:"Pong!"})})

module.exports = app