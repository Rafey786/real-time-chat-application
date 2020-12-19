const socket = io()
let name;
do{
    name = prompt('Enter your name? ');
}while(!name);

let textarea = document.querySelector('#textarea')

textarea.addEventListener('keyup',(enter)=>{
    if(enter.key === 'Enter'){
        sendMessage(enter.target.value)
    }
})

function sendMessage(message){
    let msg = {
        username : name,
        message : message.trim()
    }

    addMessage(msg,'outgoing')
    textarea.value = ''
    showMessageUp()

    socket.emit('message',msg)
}

let chatarea = document.querySelector('.chatarea')

function addMessage(msg,type){
    let createDivElement = document.createElement('div')
    let className = type
    createDivElement.classList.add(className,'message')

    let addTochat = ` <h5>${msg.username}</h5>
                   <h6>${msg.message}</h6> `

    createDivElement.innerHTML = addTochat
    chatarea.appendChild(createDivElement)
}

socket.on('message',(msg)=>{
    addMessage(msg,'incomming')
    showMessageUp()
})

function showMessageUp(){
    chatarea.scrollTop = chatarea.scrollHeight
}