var socket = io('http://localhost:3000');
alert('Connected as ' + $('#username_hidden').val() + ' !');
socket.emit('connected', {
    username : $('#username_hidden').val()
});
