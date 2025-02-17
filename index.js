import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import formSchema from "./models/formSchema.js"
import cors from "cors"
import dotenv from "dotenv"
import { Logger } from "./logger.js"
const app=express()
const port=7200
dotenv.config()
// mongoose.connect("mongodb://localhost:27017/mp-dte",)
mongoose.connect(process.env.MONGO_URI)
const db=mongoose.connection
db.on("error",()=>{console.log("Error in connecting to database")})
db.once("open",()=>{console.log("Connected to database")})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())







async function Compute(recv){
  let data_round_name="2022_"+"first"+"s"
  if (recv["round"]=="Round 1"){
     data_round_name="2022_"+"first"+"s";
  }
  if (recv["round"]=="Round 2"){
     data_round_name="2022_"+"second"+"s";
  }
  if  (recv["round"]=="Round 3"){
    data_round_name="2022_"+"third"+"s";
  } 
  console.log(data_round_name)
  let rankInt = parseInt(recv["rank"], 10);
  if (rankInt<14000){
   alert("There is no need to check colleges for you , you will get admission anywhere ")
  }





  const formModel=new mongoose.model(data_round_name,formSchema)






 console.log(recv)
  const find_branchs= await formModel.find(
   {"JEE CLOSING RANK":{$gt:rankInt},
   "BRANCH":recv["branch"],"ALLOTTED CATEGORY":recv["category"]},
   {"INSTITUTE NAME":1,
      'JEE OPENING RANK':1,
      'JEE CLOSING RANK':1,
      "_id":0
   })
  console.log(await find_branchs)
  return await find_branchs
}




/////////////////////////////////////
app.get("/submit-form", async (request,response)=>{  
  response.status(200)
  const clientIp = request.ip;
  const b_data=request.get("User-Agent")
  const recv= request.query
  Logger(clientIp,b_data)
  console.log(recv)  
  response.json(await Compute(recv))   


}) 
app.get("/show-data",async(request,response)=>{
   const recv_data=request.query
   response.send("ok")
})

app.listen(port,()=>{
    console.log("Server is running on port 7200")
})
