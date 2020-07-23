let socket = io()

$('#loginBox').show()
$('#chatBox').hide()

//login button clicked
$('#loginBtn').click(() => {
    
    //emit(x , {optional obj}) x -> is the name of the event
    socket.emit('login' , {
        username : $('#loginInput').val(),
        password : $('#loginPass').val()
    })    
    
})   

socket.on('logged_in' , (data)=>{      
        $('#loginBox').hide()
        $('#chatBox').show()
        $('#displayUser').text(`Hi ${data.username} ,`); 
    })


 socket.on('login_failed' , ()=>{
        alert('Invalid Username or Password');
    })
        
socket.on('unfilled' , ()=>{
    alert('Please eneter a valid Username and password')
})


//send msg button clicked
    
$('#sendMsgBtn').click(()=>{
    
    socket.emit('msg_send' , {
        msg: $('#msgBox').val(),        
        username : $('#loginInput').val(),
        to: $('#toUser').val()
    })
})


socket.on('msg_rcvd' , (data)=>{
    $('#ulList').append($('<li>').text(`
    [${data.from}] : ${data.msg}`))
})

