const 
  Spotify     = require('node-spotify-api'),
  _config     = require('../config'),
  spotify     = new Spotify({
    id     : _config.spotify.id,
    secret : _config.spotify.secret
  }),
  SongModel      = require('../models/SongModel').Model,
  SongController = {};

SongController.getTrack = (data, cbSuccess, cbError) => {
  let query = '';
  if(data.artist) {
    if(data.artist.trim().length) {
      query += 'artist:*' + encodeURI(data.artist.trim()).replace(' ', '%20') + '*';
    }
  }
  if(data.artist && data.track) {
    if(data.artist.trim().length && data.track.trim().length) {
      query += ' AND '; 
    }
  }
  if(data.track) {
    if(data.track.trim().length) {
      query += 'track:*' + encodeURI(data.track.trim()).replace(' ', '%20') + '*';
    }
  }

  if(query.length == 0) {
    cbSuccess([]);
  } else {
    spotify.search(
      {
        type: 'track',
        query: query,
        limit: 50
      },
      (err, data) => {
        if (err) {
          cbError(err);
        } else {
          cbSuccess(data);
        }
      }
    );
  }
}

SongController.add = (data, cbSuccess, cbError) => {
  new SongModel({
    artist: data.artist,
    title: data.title,
    idSpotify: data.idSpotify
  }).save((err, player) => {
    if (err) {
      cbError(err);
    } else {
      cbSuccess(player);
    }
  });
};

SongController.remove = (data, cbSuccess, cbError) => {
  SongModel.remove( {
      idSpotify: data.idSpotify
    },
    (err, song) => {
      if (err) {
        cbError(err);
      } else {
        cbSuccess(song);
      }
    }
  );
};

SongController.getAll = (cbSuccess, cbError) => {
  SongModel.find((err, songs) => {
    if (err) {
      cbError(err);
    } else {
      cbSuccess(songs);
    }
  });
};

module.exports = SongController;
