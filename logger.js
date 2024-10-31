import { time, timeStamp } from "console";
import fs from "fs";
import path from "path"



export function Logger(ip,agent){
    const logFilePath = 'app.log'
    const timeStamp=new Date().toISOString()
    const content=`${ip} at ${timeStamp} from ${agent}`
    fs.appendFile(logFilePath,content,(err)=>
        {
            if (err){
        console.error('Error writing to log file', err)
    }}
)   


}
