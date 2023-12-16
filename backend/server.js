// require express from 'express';
const express = require('express');
const axios = require('axios');
const cors = require('cors');   
const mongoose = require('mongoose');
const AuthRoutes = require('./Routes/auth')
const messagesroute = require('./Routes/messagesroutes')

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected to database');
}).catch((err)=>{
    console.log(err);
});
server.use('/api/auth' , AuthRoutes);
// server.use('/api/messages' , messagesroute);

const PORT = (3000 || process.env.PORT);
server.listen(PORT , console.log(`server is running on ${PORT}`))