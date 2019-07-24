const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/v1", require("./entities/routes"))

const mongoUrl="mongodb://localhost:27017/OnlineShop"
const nodePort=3001

app.listen(nodePort, () => {
    mongoose.set('useFindAndModify', false)
    mongoose.connect(
        mongoUrl,
        {useNewUrlParser: true, useCreateIndex: true}
    )
    .then(
        (connection)=>{
            if(!connection) throw "Error connecting to the database"
            console.log("Conectado a la base de datos")
            console.log(`Escuchando puerto`,nodePort)
        }
    )
    .catch(
        (error)=>{
            console.log(error)
        }
    )
    
  })