let socket = io()

$('#loginBox').show()
$('#chatBox').hide()

$('#loginBtn').click(() => {
     
    //emit(x , {optional obj}) x -> is the name of the event
    socket.emit('login' , {
        username : $('#loginInput').val()
    })    

    socket.on('logged_in' , (data)=>{      
        $('#loginBox').hide()
        $('#chatBox').show()
        $('#displayUser').text(`Hi ${data.username} ,`); 
    })
        
})