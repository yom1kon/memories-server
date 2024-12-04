import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRouters from './routes/posts.js'

// const express = require('express');
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/', postRouters)
app.get('./',(req,res)=>{
    res.send('hello to memories api')
})
// const CONNECTION_URL = 'mongodb+srv://mernmemories:mernmemories123@cluster0.e5agvuw.mongodb.net/';

const PORT = process.env.PORT || 5555;

mongoose.connect(process.env.CONNECTION_URL)
.then(()=>app.listen(PORT, ()=>console.log(`server running on port ${PORT}`)))
.catch(((error)=>console.log(error.message)));

