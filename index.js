const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const port=3000

// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse application/json
app.use(bodyParser.json());
app.post("/submit-form",(request,response)=>{
    response.send("Form Submitted")
    console.log(request.body)
})

app.listen(port,()=>{
    console.log("Server is running on port 3000")
})