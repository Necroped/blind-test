var socket = io('http://localhost:3000');
var playersTable = $('#playersTable').DataTable( {
    ajax: {
        url : '/api/players/all',
        dataSrc : 'data'
    },
    columns: [
        { data: 'username' },
        { data: 'connected' },
        { data: 'score' }
    ],
    paging : false
});
socket.on('player/new', (player) => {
    alert(player.username + ' connected ! ');
    playersTable.ajax.reload();
});
socket.emit('admin/connected', {
    username : $('#username_hidden').val()
});