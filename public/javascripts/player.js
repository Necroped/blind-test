var socket = io('http://localhost:3000');

socket.emit('player/new', {
  player_id: $('#playerid_hidden').val()
});

$('#click').click(function() {
  socket.emit('player/click', {
    player_id: $('#playerid_hidden').val(),
    time: Date.now()
  });
});
