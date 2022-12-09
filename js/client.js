
const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3')

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message)
    messageInput.value = '';
})

const n = prompt('Enter Your Name: ');

socket.emit('new-user-joined', n);

socket.on('user-joined',n =>{
    append(`${n} joined the chat`,'left')
})
socket.on('receive',data =>{
    append(`${data.name}: ${data.message}`,'left')
})
socket.on('left',n =>{
    append(`${n} left the chat`,'left')
})
