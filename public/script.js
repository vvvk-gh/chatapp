let socket = io()

$('#loginBox').show()
$('#chatBox').hide()

//login button clicked
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


//send msg button clicked
    
$('#sendMsgBtn').click(()=>{
    console.log(`send btn clicked`)
    socket.emit('msg_send' , {
        msg: $('#msgBox').val(),        
        username : $('#loginInput').val(),
        to: $('#toUser').val()
    })
})


socket.on('msg_rcvd' , (data)=>{
    $('#ulList').append($('<li>').text(data.msg))
})