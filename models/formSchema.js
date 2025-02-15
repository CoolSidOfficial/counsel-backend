import mongoose from "mongoose";

const formSchema=new mongoose.Schema(
    {


    " SNO":Number,
     "INSTITUTE NAME": String,
     "INSTITUTE TYPE": String,
     "FW": String,
     "BRANCH": String,
     "JEE OPENING RANK": Number,
     "JEE CLOSING RANK": Number,
     "ALLOTTED CATEGORY": String, 
     "TOTAL ALLOTTED": Number,
   }
 )


export default formSchema

