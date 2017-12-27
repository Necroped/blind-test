var loadjs;
var LoadJS = function() {
  var _this = this;

  this.teams = [];
  this.songs = [];
  this.players = [];

  this.getTeams = function() {
    Ajax.teams().done(function(data) {
      _this.teams = data;
    });
  };

  this.getSongs = function() {
    Ajax.songs().done(function(data) {
      _this.songs = data;
    });
  };

  this.getPlayers = function() {
    Ajax.players().done(function(data) {
      _this.players = data;
    });
  };

  this.initSearchSongs = function() {
    Datatables.initSearchSongs('#searchSongsTable');
    $('#search_song_input').on('keyup', function() {
      if (Datatables.searchsongs && $(this).val().length >= 3) {
        Datatables.searchsongs.ajax.reload();
      }
    });
  };

  this.initSongs = function() {
    Datatables.initSongs('#songsTable');
  };

  this.initPlayers = function() {
    Datatables.initPlayers('#playersTable');
  };

  this.initTeams = function() {
    Datatables.initTeams('#teamsTable');
    $('#create_team').click(function() {
      Ajax.teamCreate({
        name: $('#create_team_name').val(),
        color: $('#create_team_color').val()
      })
        .done(function(data) {
          Datatables.teams.ajax.reload();
        })
        .fail(function(err, data) {
          alert('ERROR : ' + JSON.stringify(err));
        });
    });
  };

  this.songAdd = function(data) {
    var songsAddedId = data.externalId;
    Ajax.songAdd(data).done(function() {
      loadjs.getSongs();
      Musicplayer.tracks.add(songsAddedId);
      Datatables.songs.ajax.reload();
      Datatables.searchsongs.ajax.reload();
    });
  };
  this.songRemove = function(data) {
    var trackId = data.externalId;
    Ajax.songRemove(data).done(function() {
      loadjs.getSongs();
      Musicplayer.tracks.remove(trackId);
      Datatables.songs.ajax.reload();
      Datatables.searchsongs.ajax.reload();
    });
  };
};

LoadJS.init = function() {
  var currentPage = $('#content').attr('data-page');
  loadjs = new LoadJS();
  loadjs.getTeams();
  loadjs.getSongs();
  loadjs.getPlayers();
  Datatables.loadjs = loadjs;

  if ($('.jscolor').length > 0) {
    jscolor.installByClassName('jscolor');
  }
  Musicplayer.init(loadjs.songs);

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
