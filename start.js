const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/v1", require("./entities/routes"))

app.get('/',function(req,res){
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('Backend Ready to recieve requests!');
    res.end();
})

const mongoUrl= process.env.MONGODB_URI || "mongodb://localhost:27017/OnlineShop"
const nodePort= process.env.PORT || 3001

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