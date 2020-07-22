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

    //client to server - server : executing
    //emitted events are executed using on method
    socket.on('printboom', ()=>{
        console.log(`Boom recieved from : ${socket.id}`)
    })


    //server to client - server : calling
    setInterval(()=> {
        socket.emit('whizz')
    },2000)
})


app.use('/' , express.static(__dirname + '/public'))


server.listen('3334' ,()=>{
    console.log(`Listening at http://localhost:3334`)
})