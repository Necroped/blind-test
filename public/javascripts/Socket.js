var socket = io("http://localhost:3000");

socket.on("player/new", player => {
    console.log("New player connected : " + player.username);
    if (Datatables.players) {
        Datatables.players.ajax.reload();
    }    
});
socket.on("team/new", player => {
    if(Datatables.teams) {
        Datatables.teams.ajax.reload();
    }
});
socket.emit("admin/connected", {
    username: $("#username_hidden").val()
});
socket.on("player/click", data => {
    var player = data.player;
    var time = data.time;
    alert(player.username + ' clicked at : ' + new Date(time).toLocaleTimeString())
});
