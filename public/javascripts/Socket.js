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
  Musicplayer.pause;
  Ajax.getPlayer({
    _id: data.player_id
  }).done(function(player) {
    $('#answer_modal').remove();
    Ajax.getModal('answer', {
      player: player,
      time: time,
      track: Musicplayer.getCurrentTrack()
    }).done(function(modal) {
      $('#modals').append(modal);
      $('#answer_modal').modal();
      $('#answer_modal').on('hidden.bs.modal', function() {
        Musicplayer.next();
      });
    });
  });
});
