// require express from 'express';
const express = require('express');
const axios = require('axios');
const cors = require('cors');   
const mongoose = require('mongoose');
const AuthRoutes = require('./Routes/auth')
const messagesroute = require('./Routes/messagesroutes')
require ("dotenv").config();
const socket = require("socket.io");

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

mongoose.connect(`mongodb://localhost:27017/chat_application` , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected to database');
}).catch((err)=>{
    console.log(err);
});
server.use('/api/auth' , AuthRoutes);
// server.use('/api/messages' , messagesroute);

const PORT = (5000 );
server.listen(PORT , console.log(`server is running on ${PORT}`))

// const io = socket(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       credentials: true,
//     },
//   });
  
//   global.onlineUsers = new Map();
//   io.on("connection", (socket) => {
//     global.chatSocket = socket;
//     socket.on("add-user", (userId) => {
//       onlineUsers.set(userId, socket.id);
//     });
  
//     socket.on("send-msg", (data) => {
//       const sendUserSocket = onlineUsers.get(data.to);
//       if (sendUserSocket) {
//         socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//       }
//     });
//   });

