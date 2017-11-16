var socket = socket || io('http://localhost:3000');

var LoadJS = function() {
    
    var _this = this;

    this.teams = [];
    this.songs = [];
    

    Ajax.teams(function(data) {
        _this.teams = data;
    });
    
    Ajax.songs(function(data) {
        _this.songs = data;
    });


    this.initSongs = function() {

        Datatables.initSongs("#songsTable");

        $("#search_song_input").on("keydown", function() {
            if(Datatables.songs && $(this).val().length >= 3) {
                Datatables.songs.ajax.reload()
            }
        });

    }

    this.initPlayers = function() {

        Datatables.initPlayers("#playersTable");

    }

    this.initTeams = function() {

        Datatables.initTeams("#teamsTable");
        $("#create_team").click(function() {
            var callAjax = Ajax.teamCreate({
                name  : $("#create_team_name").val(),
                color : $("#create_team_color").val()
            }).done(function(data) {
                if (!data.error) {
                    Datatables.teams.ajax.reload();
                } else {
                    alert("error : " + data.error);
                }
            });
        });
    }
}

LoadJS.init = function() {
    
    var currentPage = $("#content").attr("data-page");
    var loadjs = new LoadJS();
    Datatables.loadjs = loadjs;

    if ($(".jscolor").length > 0) {
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
        default:
            loadjs.initHome();
    }
};
