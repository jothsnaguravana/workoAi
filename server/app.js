import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";

const app  = express(); 

app.use(express.json());
app.use("/worko",router)



mongoose.connect(
    "mongodb+srv://jyoshnaguravana:0SE5zErrHMfjDOIN@cluster0.zlskkdy.mongodb.net/WA?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => app.listen(5000))
    .then(() => console.log("Connected m"))
    .catch((err) => console.log(err));

app.use("/api" , (req,res,next)=> {
    res.send("Hello World");
})

// app.listen(5000); 

//0SE5zErrHMfjDOIN
//mongodb+srv://jyoshnaguravana:0SE5zErrHMfjDOIN@cluster0.zlskkdy.mongodb.net/
//mongodb+srv://jyoshnaguravana:0SE5zErrHMfjDOIN@cluster0.zlskkdy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0