const 
  _config     = require('../config'),
  SongModel      = require('../models/SongModel').Model,
  SongController = {};
  var Deezer = require("deezer-node-api");
  var dz = new Deezer();

SongController.getTrack = (data, cbSuccess, cbError) => {
  var jsonQuery = {};
    if (data.artist) {
      if (data.artist.trim().length) {
        jsonQuery.artist = encodeURI(data.artist.trim()).replace(" ", "%20");
      }
    }
    if (data.track) {
      if (data.track.trim().length) {
        jsonQuery.track = encodeURI(data.track.trim()).replace(" ", "%20");
      }
    }
    dz
      .findTracks(jsonQuery)
      .then((data) => {
        cbSuccess(data);
      })
      .catch((err, data) => {
        cbErrorr(err)
      });
}

SongController.add = (data, cbSuccess, cbError) => {
  new SongModel({
    artist     : data.artist,
    title      : data.title,
    externalId : data.externalId,
    cover      : data.cover
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
      externalId: data.externalId
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
