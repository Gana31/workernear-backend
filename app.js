import express from 'express'
import ServerConfig from './config/ServerConfig.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin:ServerConfig.ORIGIN,
    methods:["POST","PATCH","PUT","GET","DELETE","UPDATE"],
    credentials : true,
}));
app.use(cookieParser());

app.get("/",(req,res)=>{
return res.status(200).json({message : "Your APi is Running "})
})

app.all("*",(req,res)=>{
    return res.status(404).json({message:"no Page Found check your url"})
})

export default app;