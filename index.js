import express from 'express';
import dotenv from  'dotenv';
import mongoose from 'mongoose'
import bookRoute from './route/book.route.js'
import cors from "cors";
import  userRoute from './route/user.route.js'
const app=express();

app.use(cors());
app.use(express.json())
dotenv.config()
const port = process.env.Port||5000;

const url=process.env.MONGODBURL;
//CONNECT T0O MGONGODB
  mongoose.connect(
    url,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    }
  
  )
 
const db=mongoose.connection;

//define event listners for data base connection 
db.on('connected',()=>{
 console.log("Connected to mongodb server")
});
db.on('error',(err)=>{
 console.log("Mongodb connection error:",err);

});
db.on('disconnected',()=>{
 console.log("Mongodb disconnected")
});

 app.use("/api/book",bookRoute);
app.use("/api/user",userRoute);
app.use("/api/user",userRoute);

app.get("/",(req,res)=>{
   res.send("API Working")
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
