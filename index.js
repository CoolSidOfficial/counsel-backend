import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import formSchema from "./models/formSchema.js"
import cors from "cors"
const app=express()
const port=3000
mongoose.connect("mongodb://localhost:27017/mp-dte",)

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
  const formModel=new mongoose.model(data_round_name,formSchema)
  const find_branchs= await formModel.find({"JEE CLOSING RANK":{$lt:recv["rank"]},"BRANCH":recv["branch"]},{"INSTITUTE NAME":1,'JEE OPENING RANK':1,"_id":0})
  console.log(await find_branchs)
  return await find_branchs
}
 app.get("/submit-form", async (request,response)=>{  
  response.status(200)
  const recv= request.query
  response.json(await Compute(recv))   
  //  console.log(rank,category)  


}) 
app.get("/show-data",async(request,response)=>{
   const recv_data=request.query

})

app.listen(port,()=>{
    console.log("Server is running on port 3000")
})
