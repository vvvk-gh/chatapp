let socket = io()


document.getElementById('clickable')
.onclick = function() {
    socket.emit('printboom');    
}
//client to server : client - calling
//we can use emit to call an event 




// server to client : client - executing
//we can use on to execute emitted event
socket.on('whizz' , ()=>{
    let div = document.createElement('div')
    div.innerText = 'Whizz'
    document.body.appendChild(div);
})

