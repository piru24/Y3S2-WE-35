require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./order-route/order-route");
const app = express();
const cookieParser = require('cookie-parser');

//declare port
const PORT = process.env.PORT || 8020; 
app.use(cookieParser());

//using dependencies
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(bodyParser.json());
app.use("/Order",router)
const link="mongodb+srv://Piruthivi:Ruthi24@cluster0.nt1n9me.mongodb.net/food";

mongoose.connect(link)
	.then(()=>console.log("Connected to DataBase"))
    .then(() =>{
        app.listen(PORT)
    }).catch((err)=>console.log(err));
