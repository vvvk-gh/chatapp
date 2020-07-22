const http = require('http')
const express = require('express')
const app = express() 
const socketio = require('socket.io')

//creating an http server as socket.io works on top of http
//so converting express into http sever
const server = http.createServer(app)
const io = socketio(server);

io.on('connection', (socket)=>{
    console.log(`Connected to the socket : ${socket.id}`)
    
    //client to server : server listening/executing using on method
    socket.on('msg_sent' ,(data)=>{
        console.log(`Msg Recived from Screen/Client : ${data.msg}`)
        //once the server recive the data the server needs to send  back to display it on screen
        //we need to do server to client communication using emit
        //server to client server : calling
        console.log('sending the recived msg to Screen/Client')
        
        //why dont we use socket.emit and why only io.emit
        // if we use socket.emit() it will send back only to that particlar socket/socketid pipeline in the server
        //socket.emit('msg_revd' ,data)
        //on other hand io.emit() is useful as io() has all the sockets/sockets id that are connected to the server 
        io.emit('msg_revd', data)
        //we can also use socket.broadcast.emit('msg_revd' , data)
        //but it sends to all the remaining socekts another than from which it has been sent 
        //socket.broadcast.emit('msg_revd' , data)
    })
})


app.use('/' , express.static(__dirname + '/public'))

server.listen('3334' ,()=>{
    console.log(`Listening at http://localhost:3334`)
})