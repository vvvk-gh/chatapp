let socket = io()

let sendMsgBtn = document.getElementById('sendMsgBtn')
let msgBox = document.getElementById('msgBox')
let ulMsgList = document.getElementById('ulMsgList')

//client to server : client sending through emit
sendMsgBtn.onclick = function() {
        socket.emit('msg_sent' , {
                msg:msgBox.value
        })
        //and making it empty
        msgBox.value = ' '
} 

// server to client : client executing 
socket.on('msg_revd' , (data)=>{
    let newMsgItem = document.createElement('li')
    newMsgItem.innerText = data.msg
    ulMsgList.append(newMsgItem); 
})


