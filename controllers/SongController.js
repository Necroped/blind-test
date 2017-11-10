const Spotify = require("node-spotify-api"),
  _config = require("../config"),
  spotify = new Spotify({
    id: _config.spotify.id,
    secret: _config.spotify.secret
  }),
  SongModel = require("../models/SongModel").Model,
  SongController = {};

SongController.getTrack = (data, cbSuccess, cbError) => {
  spotify.search(
    {
      type: "track",
      query: data.track,
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
    (err, player) => {
      if (err) {
        cbError(err);
      } else {
        cbSuccess(players);
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
