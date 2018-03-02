var socket = io();
socket.on('connect', function () {
    console.log('Connected to Server')
    socket.emit('newMessageFromClient',{
        from:'From Clent',
        to:'server'
    });
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});
socket.on('newMessage', function (message) {
    console.log('New Message',message);
});

