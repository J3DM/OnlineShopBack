const express= require("express")
const app=express()

const UserController=require("./UserController")

app.post("",UserController.CreateUser)

module.exports=app