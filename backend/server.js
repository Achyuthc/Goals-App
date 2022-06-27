const express=require('express')
const colors=require('colors')
const dotenv=require('dotenv').config()

const app=express();


const MongoDB=require('./config/db')
const {errorHandler}=require('./middleware/errorMiddleware');
const { models } = require('mongoose');
const port=process.env.PORT||5000;

MongoDB();
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/goals',require('./routes/goalRoutes'))

app.use(errorHandler);

app.listen(port,()=>console.log("server is running"))
