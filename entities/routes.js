const express= require("express")
const app=express()

app.use("/product",require("./products/ProductRoutes"))

app.get("/ping",(req,res)=>{res.status(200).json({message:"Pong!"})})

module.exports = app