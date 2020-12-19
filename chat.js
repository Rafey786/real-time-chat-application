const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)
const PORT = process.env.PORT||8000;

http.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + '/chat'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});


io.on('connection',(Socket)=>{
    console.log('Connected...')
    Socket.on('message',(msg)=>{
        Socket.broadcast.emit('message',msg)
    })
})