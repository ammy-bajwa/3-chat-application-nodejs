const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const publicPatch = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPatch));
io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })
    });
});
io.on('disconnect',()=>{
    console.log('Disconnected from server');
});
server.listen(port, () => {
    console.log('server is up');
});