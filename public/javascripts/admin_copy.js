var socket = socket || io('http://localhost:3000');

$(document).ready(function() {

    var currentPage = $('#content').attr('data-page');
    var loadjs = new LoadJS();
    Datatables.init();

    if($('.jscolor').length > 0) {
        jscolor.installByClassName("jscolor");
    }

    switch (currentPage) {
        case "songs":
            loadjs.initSongs();
        break;
        case "players":
            loadjs.initPlayers();
        break;
        case "teams":
            loadjs.initTeams();
        break;
        default : 
            loadjs.initHome();
    }
})


LoadJS = function() {
    this.teams = [];
    this.songs = [];
    
    this.initSongs = function() {

        Datatables.initSongs("#songsTable");

        $("#search_song_input").on("keydown", function() {
            if(Datatables.songs && $(this).val().length >= 3) {
                Datatables.songs.ajax.reload()
            }
        });

    }

    this.initPlayers = function() {

        Datatables.initSongs("#playersTable");

    }

    this.initTeams = function() {

        Datatables.initSongs("#teamsTable");
        $("#create_team").click(function() {
            Ajax.teamCreate({
                name  : $("#create_team_name").val(),
                color : $("#create_team_color").val()
            }, function(data) {
                if (!data.error) {
                    location.reload();
                } else {
                    alert("error : " + data.error);
                }
            });
        });
    }

}