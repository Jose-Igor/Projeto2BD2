require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING).then(()=>{
    app.emit("pronto");
}).catch(e =>{
    console.log(e);
});

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));
app.use(router);
app.use(express.static('views'));
app.use(express.json());



app.on("pronto",()=>{
    app.listen(3000,()=>{
        console.log("Acessar http://localhost:3000")
        console.log(`Servidor execultando na porta 3000`);
    });
})

