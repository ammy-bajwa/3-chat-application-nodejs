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

    socket.emit('newEmail',{
        from:'amir@gmail.com',
        text:"Hello AMir",
        createdAt:23
    });
    socket.on('createEmail',(newEmail)=>{
        console.log('createEmail',newEmail);
    });
    socket.emit('newMessage',{
        from:'server',
        to:'all',
        createdAt:32
    });
    socket.on('newMessageFromClient',(clientMessage)=>{
        console.log('Message from Client', clientMessage);
    })
});
io.on('disconnect',()=>{
    console.log('Disconnected from server');
});
server.listen(port, () => {
    console.log('server is up');
});