import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRouters from './routes/posts.js'
import userRouters from './routes/user.js'



// const express = require('express');
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
// app.use(cors());
const corsOptions = {
    origin: 'https://memories-five-psi.vercel.app/', // 替换为你的前端 URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // 明确允许的 HTTP 方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: true // 如果需要传递认证信息
  };
  
  app.use(cors(corsOptions));
app.options('*', cors()); // 允许所有路由的 OPTIONS 请求

  
app.use('/posts', postRouters);
app.use('/user',userRouters);

app.get('/',(req,res)=>{
    res.send('hello to memories api')
})
// const CONNECTION_URL = 'mongodb+srv://mernmemories:mernmemories123@cluster0.e5agvuw.mongodb.net/';

const PORT = process.env.PORT || 5555;

mongoose.connect(process.env.CONNECTION_URL)
.then(console.log(`server running on port ${PORT}`))
.catch(((error)=>console.log(error.message)));

export default app;