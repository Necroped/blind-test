var loadjs;
var LoadJS = function() {
  var _this = this;

  this.teams = [];
  this.songs = [];
  this.players = [];

  this.getTeams = function() {
    Ajax.JSON.teams().done(function(data) {
      _this.teams = data;
    });
  };

  this.getSongs = function() {
    Ajax.JSON.songs().done(function(data) {
      _this.songs = data;
    });
  };

  this.getPlayers = function() {
    Ajax.JSON.players().done(function(data) {
      _this.players = data;
    });
  };

  this.initSearchSongs = function() {
    Datatables.initSearchSongs('#searchSongsTable');
    $('#search_song_input').on('keyup', function() {
      if (Datatables.searchsongs && $(this).val().length >= 3) {
        Datatables.searchsongs.ajax.JSON.reload();
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
    console.log('initTeams');
    $('#teamsContent').html('');
    Ajax.template
      .playersNoTeam({ team: { exists: false } })
      .done(function(content) {
        $('#teamsContent').append(content);
      });
    Ajax.template.teams({ team: { exists: true } }).done(function(content) {
      $('#teamsContent').append(content);
    });
    $('.droppable').each(function(index, elem) {
      $(elem).droppable({
        accept: '.draggable',
        drop: function(event, ui) {
          console.log('drop it');
          Ajax.JSON.playerUpdateTeam(
            $(ui.draggable[0]).attr('data-playerid'),
            $(event.target).attr('data-teamid')
          );
          loadjs.initTeams();
        }
      });
    });
    $('.draggable').each(function(index, elem) {
      $(elem).draggable({
        classes: {
          'ui-draggable-dragging': 'active'
        },
        revert: 'invalid',
        containment: 'document',
        helper: 'clone',
        cursor: 'move'
      });
    });

    //Datatables.initTeams('#teamsTable');
    $('#create_team').click(function() {
      Ajax.JSON.teamCreate({
        name: $('#create_team_name').val(),
        color: $('#create_team_color').val()
      })
        .done(function(data) {
          loadjs.initTeams();
        })
        .fail(function(err, data) {
          alert('ERROR : ' + JSON.stringify(err));
        });
    });
  };

  this.songAdd = function(data) {
    var songsAddedId = data.externalId;
    Ajax.JSON.songAdd(data).done(function() {
      loadjs.getSongs();
      Musicplayer.tracks.add(songsAddedId);
      Datatables.songs.ajax.JSON.reload();
      Datatables.searchsongs.ajax.JSON.reload();
    });
  };
  this.songRemove = function(data) {
    var trackId = data.externalId;
    Ajax.JSON.songRemove(data).done(function() {
      loadjs.getSongs();
      Musicplayer.tracks.remove(trackId);
      Datatables.songs.ajax.JSON.reload();
      Datatables.searchsongs.ajax.JSON.reload();
    });
  };
};

LoadJS.init = function() {
  var currentPage = readCookie('currentPage'); //$('#content').attr('data-page');
  loadjs = loadjs || new LoadJS();
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
