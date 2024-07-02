const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const app=express()
const port=3000
mongoose.connect("mongodb://localhost:27017/mp-dte")

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
const formModel=new mongoose.model("2022_firsts",formSchema)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
async function fucker(r){

    const find_branch=  await formModel.find({"JEE CLOSING RANK":{$lt:r+1}})
    console.log(find_branch)
    return   find_branch
}
app.post("/submit-form", (request,response)=>{  
  response.send("Form Submitted")
  console.log(request.body.rank)
   fucker(request.body.rank)
  

})
    
app.listen(port,()=>{
    console.log("Server is running on port 3000")
})