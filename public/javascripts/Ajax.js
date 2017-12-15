var Ajax = function() {};

Ajax.playerUpdateTeam = function(id) {
  var select = $('#' + id);
  return $.ajax({
    dataType: 'json',
    url: '/api/player/update/team',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      player_id: id,
      team_id: select.val()
    })
  });
};

Ajax.teams = function() {
  return $.ajax({
    dataType: 'json',
    url: '/api/teams/all',
    type: 'GET'
  });
};

Ajax.songs = function() {
  return $.ajax({
    dataType: 'json',
    url: '/api/songs/all',
    type: 'GET'
  });
};

Ajax.songAdd = function(data) {
  return $.ajax({
    dataType: 'json',
    url: '/api/song/add',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      artist: data.artist,
      title: data.title,
      externalId: data.externalId,
      cover: data.cover
    })
  });
};

Ajax.songRemove = function(data) {
  return $.ajax({
    dataType: 'json',
    url: '/api/song/remove',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      externalId: data.externalId
    })
  });
};

Ajax.teamCreate = function(data) {
  return $.ajax({
    dataType: 'json',
    url: '/api/teams/create',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      name: data.name,
      color: data.color
    })
  });
};
