var socket = io('http://localhost:3000');

socket.emit('connected', {
  player_id: $('#playerid_hidden').val()
});

$('#click').click(() => {
  socket.emit('player/click', {
    time: Date.now()
  });
});
