var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
socket.on('newLocationMessage',function(location){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  a.attr('href',location.url);
  li.text(`${location.from} :`);
  li.append(a);
  jQuery('#messages').append(li);

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    alert('Sorry You Don`t Have This Serves');
  };
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    },function(){
      console.log('Unable to fetch your location');
    })
  })
})
