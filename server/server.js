const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const publicPatch = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage} = require ('./utils/message'); 


var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPatch));
io.on('connection', (socket) => {
    console.log('New User Connected');
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.emit('newMessage',generateMessage('adim','new user joined'));

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        // io.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
        socket.broadcast.emit('newMessage',generateMessage(message.from,message.text));
    });
});
io.on('disconnect',()=>{
    console.log('Disconnected from server');
});
server.listen(port, () => {
    console.log('server is up');
});