require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const orderRoute = require('./routes/orderRoutes')

const app = express();

app.use(express.json());

connectDB();

app.get('/', (req, res)=>{
    res.send({message: "API working..."});
})

app.use('/api', orderRoute) 

app.listen(process.env.PORT, ()=>{
    console.log(`server is up...`);
})