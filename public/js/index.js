var socket = io();
socket.on('connect', function () {
    console.log('Connected to Server')
    socket.emit('creatEmail',{
        to:'talha@gmail.com',
        text:'hello amir'
    });
    socket.emit('newMessageFromClient',{
        from:'From Clent',
        to:'server'
    });
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});
socket.on('newEmail', function (email) {
    console.log('New Email',email);
})
socket.on('newMessage',function(newMessage){
    console.log('new message from the server', newMessage);
});
