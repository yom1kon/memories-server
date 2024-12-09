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


// 动态配置 origin
const corsOptions = {
  origin: (origin, callback) => {
    // 定义允许的前端 URL 列表
    const whitelist = [
      'https://memories-five-psi.vercel.app',  // 主前端域名
      'https://memories-git-main-emilys-projects-a73dda8a.vercel.app', // 测试域名
      'https://memories-jppf0skdy-emilys-projects-a73dda8a.vercel.app' // 其他子域名
    ];

    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // 如果请求来源在白名单中，允许访问
      callback(null, true);
    } else {
      // 如果来源不在白名单中，拒绝访问
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // 允许的请求方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  credentials: true // 如果需要传递 Cookie 或认证信息
};

app.use(cors(corsOptions));

app.options('*', cors()); // 允许所有路由的 OPTIONS 请求

  
app.use('/posts', postRouters);
app.use('/user',userRouters);

app.get('/',(req,res)=>{
    res.send('hello to memories api')
})
// const CONNECTION_URL = 'mongodb+srv://mernmemories:mernmemories123@cluster0.e5agvuw.mongodb.net/';

// 全局错误处理
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  });
  
const PORT = process.env.PORT || 5555;

mongoose.connect(process.env.CONNECTION_URL)
.then(console.log(`server running on port ${PORT}`))
.catch(((error)=>console.log(error.message)));

export default app;