var Ajax = {};
Ajax.template = {};
Ajax.JSON = {};

Ajax.JSON.playerUpdateTeam = function(player_id, team_id) {
  return $.ajax({
    dataType: 'json',
    url: '/api/player/update/team',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      player_id: player_id,
      team_id: team_id
    })
  });
};

Ajax.JSON.teams = function() {
  return $.ajax({
    dataType: 'json',
    url: '/api/teams/all',
    type: 'GET'
  });
};

Ajax.JSON.players = function(data) {
  return $.ajax({
    dataType: 'json',
    url: '/api/players/all',
    type: 'GET',
    data: data
  });
};

Ajax.template.playersNoTeam = function(data) {
  return $.ajax({
    dataType: 'html',
    url: '/api/players/noteam',
    type: 'GET',
    data: data
  });
};

Ajax.template.teams = function(data) {
  return $.ajax({
    dataType: 'html',
    url: '/api/teams',
    type: 'GET',
    data: data
  });
};

Ajax.JSON.songs = function() {
  return $.ajax({
    dataType: 'json',
    url: '/api/songs/all',
    type: 'GET'
  });
};

Ajax.JSON.songAdd = function(data) {
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

Ajax.JSON.songRemove = function(data) {
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

Ajax.JSON.teamCreate = function(data) {
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

Ajax.JSON.getPlayer = function(data) {
  return $.ajax({
    dataType: 'json',
    url: '/api/player/get',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      _id: data._id
    })
  });
};

Ajax.getModal = function(modalName, params) {
  cons.templateole.log(modalName);
  return $.ajax({
    dataType: 'html',
    url: '/api/modal',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify({
      modal: modalName,
      params: params
    })
  });
};
