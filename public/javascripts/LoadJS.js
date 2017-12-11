var loadjs;
var LoadJS = function() {
    
    var _this = this;

    this.teams = [];
    this.songs = [];   


    Ajax.teams().done(function(data) {
        _this.teams = data.data;
    });
    
    Ajax.songs().done(function(data) {
        _this.songs = data.data;
        var allIds = [],
            i      = 0;
        for (i; i < _this.songs.length; i++) {
            allIds.push(_this.songs[i].externalId);
        }
        DZ.init({
            appId: '263622',
            channelUrl: 'http://localhost:3000/',
            player: {
                container: 'musicPlayer',
                width: 800,
                height: 300,
                onload: function() {
                    console.log('Deezer player loaded.');
                    DZ.player.setBlindTestMode(true);
                    if(allIds.length > 0) {
                        DZ.player.playTracks(allIds);
                    }
                }
            }
        });
    });
    
    this.initSearchSongs = function() {
        Datatables.initSearchSongs("#searchSongsTable");
            $("#search_song_input").on("keyup", function() {
            if (Datatables.searchsongs && $(this).val().length >= 3) {
                Datatables.searchsongs.ajax.reload();
            }
        });
    };

    this.initSongs = function() {
        Datatables.initSongs("#songsTable");
    };

    this.initPlayers = function() {
        Datatables.initPlayers('#playersTable');
    }

    this.initTeams = function() {

        Datatables.initTeams('#teamsTable');
        $('#create_team').click(function() {
            Ajax.teamCreate({
                name  : $('#create_team_name').val(),
                color : $('#create_team_color').val()
            }).done(function(data) {
                Datatables.teams.ajax.reload();
            }).fail(function(err, data) {
                alert('ERROR : ' + JSON.stringify(err))
            });
        });
    }
}

LoadJS.init = function() {
    
    var currentPage   = $('#content').attr('data-page');
    loadjs            = new LoadJS();
    Datatables.loadjs = loadjs;

    if ($('.jscolor').length > 0) {
        jscolor.installByClassName('jscolor');
    }

    switch (currentPage) {
        case 'songs':
            loadjs.initSearchSongs();
            loadjs.initSongs();
            break;
        case 'players':
            loadjs.initPlayers();
            break;
        case 'teams':
            loadjs.initTeams();
            break;
        default:
            loadjs.initHome();
    }
};

LoadJS.songAdd = function(data) {
    var songsAddedId = data.externalId;
    Ajax.songAdd(data).done(function() {
        Ajax.songs().done(function(data) {
            loadjs.songs = data.data;
            DZ.player.addToQueue([songsAddedId]);
            Datatables.songs.ajax.reload();
            Datatables.searchsongs.ajax.reload();
        });
    });
};
LoadJS.songRemove = function(data) {    
    Ajax.songRemove(data).done(function() {
        Ajax.songs().done(function(data) {
            loadjs.songs = data.data;
            var allIds = [],
                i = 0;
            if (loadjs.songs.length > 0) {
              for (i; i < loadjs.songs.length; i++) {
                allIds.push(loadjs.songs[i].externalId);
              }
              DZ.player.playTracks(allIds);
            }
            Datatables.songs.ajax.reload();
            Datatables.searchsongs.ajax.reload();
        });
    });
};
