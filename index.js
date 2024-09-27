const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const app=express()
const port=3000
mongoose.connect("mongodb://localhost:27017/mp-dte",)

const db=mongoose.connection
db.on("error",()=>{console.log("Error in connecting to database")})
db.once("open",()=>{console.log("Connected to database")})
const formSchema=new mongoose.Schema({
   " SNO":Number,
    "INSTITUTE NAME": String,
    "INSTITUTE TYPE": String,
    "FW": String,
    "BRANCH": String,
    "JEE OPENING RANK": Number,
    "JEE CLOSING RANK": Number,
    "ALLOTTED CATEGORY": Number,
    "TOTAL ALLOTTED": Number,
  }
)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
async function Compute(rank,round,category,branch ){
  let data_round_name="2022_"+"first"+"s"
  if (round=="1"){
     data_round_name="2022_"+"first"+"s";
  }
  if (round=="2"){
     data_round_name="2022_"+"second"+"s";
  }
  if  (round=="3"){
    data_round_name="2022_"+"third"+"s";
  }
  // console.log(data_round_name) 
  const formModel=new mongoose.model(data_round_name,formSchema)
  const find_branchs= await formModel.find({"JEE CLOSING RANK":{$lt:rank+1},branch:branch})
  console.log(find_branchs)
}
app.post("/submit-form", (request,response)=>{  
  response.status(200)
  response.send("ok")
  recv=request.body
  const {rank,category,round,branch}=recv
  //  console.log(rank,category)  
   Compute(rank,round,category,branch)


   

}) 
    
app.listen(port,()=>{
    console.log("Server is running on port 3000")
})
