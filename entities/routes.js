const express= require("express")
const app=express()


app.get("/ping",(req,res)=>{res.status(200).json({message:"Pong!"})})

module.exports = app