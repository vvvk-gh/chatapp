const http = require('http')
const express = require('express')
const app = express() 
const socketio = require('socket.io')

//creating an http server as socket.io works on top of http
//so converting express into http sever
const server = http.createServer(app)
const io = socketio(server);

let Users ={};
io.on('connection', (socket)=>{
    console.log(`Connected to the socket : ${socket.id}`)
    socket.on('login', (data)=>{
        
        if(((data.username).length == 0|| (data.password).length == 0 )){
            socket.emit('unfilled')
        }
        
        else if(Users[data.username]){
            if((data.password).indexOf(Users[data.username]) !== -1){
                socket.join(data.username);
                socket.emit('logged_in' , data)
            }
            else{
                socket.emit('login_failed')
            }  
            
        }
        else{
            Users[data.username] = data.password
            socket.join(data.username) 
            socket.emit('logged_in' , data)
        }
        
        console.log(Users);
    })

    socket.on('msg_send', (data)=>{
        if(data.to){
            io.to(data.to).emit('msg_rcvd' ,data)
        }else{
            socket.broadcast.emit('msg_rcvd' ,data)
        }

    })

})

app.use('/' , express.static(__dirname + '/public'))

server.listen('3334' ,()=>{
    console.log(`Listening at http://localhost:3334`)
})