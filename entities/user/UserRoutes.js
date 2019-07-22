const express= require("express")
const app=express()

const UserController=require("./UserController")

app.post("/login",UserController.LoginUser)
app.post("",UserController.CreateUser)
app.get("",UserController.GetUser)
app.put("",UserController.UpdateUser)
app.put("/product",UserController.UpdateCart)
app.put("/role",UserController.UpdateRole)


module.exports=app