var socket = io('http://localhost:3000');

socket.on('player/new', player => {
  console.log('New player connected : ' + player.username);
  if (Datatables.players) {
    Datatables.players.ajax.reload();
  }
});
socket.on('team/new', player => {
  if (Datatables.teams) {
    Datatables.teams.ajax.reload();
  }
});
socket.emit('admin/connected', {
  username: $('#username_hidden').val()
});
socket.on('player/click', data => {
  var time = data.time;
  Ajax.getPlayer({ _id: data.player_id }).done(function(player) {
    console.log(player);
    $('#answer_modal').modal();
    $('#playername_answer_modal').html(player.username);
    alert(
      player.username + ' clicked at : ' + new Date(time).toLocaleTimeString()
    );
  });
});
