var Ajax = function() {};

Ajax.playerUpdateTeam = function(player_id, team_id) {
  console.log(player_id, team_id);
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

Ajax.teams = function() {
  return $.ajax({
    dataType: 'json',
    url: '/api/teams/all',
    type: 'GET'
  });
};

Ajax.players = function() {
  return $.ajax({
    dataType: 'json',
    url: '/api/players/all',
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

Ajax.getPlayer = function(data) {
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
  console.log(modalName);
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
