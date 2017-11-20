var LoadJS = function() {
    
    var _this = this;

    this.teams = [];
    this.songs = [];
    

    Ajax.teams().done(function(data) {
        _this.teams = data.data;
    });
    
    Ajax.songs().done(function(data) {
        _this.songs = data.data;
    });


    this.initSongs = function() {

        Datatables.initSongs("#songsTable");

        $("#search_song_input").on("keyup", function() {
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
            Ajax.teamCreate({
                name  : $("#create_team_name").val(),
                color : $("#create_team_color").val()
            }).done(function(data) {
                Datatables.teams.ajax.reload();
            }).fail(function(err, data) {
                alert("ERROR : " + JSON.stringify(err))
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
