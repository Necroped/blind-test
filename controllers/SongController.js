const Spotify = require("node-spotify-api"),
  _config = require("../config"),
  spotify = new Spotify({
    id: _config.spotify.id,
    secret: _config.spotify.secret
  }),
  SongModel = require("../models/SongModel").Model,
  SongController = {};

SongController.getTrack = (data, cbSuccess, cbError) => {
  console.log(data.artist && data.artist.trim().length > 0 ? "artist:*" + encodeURI(data.artist).replace(" ", "%20") + "* AND " : "" + data.track && data.track.trim().length > 0 ? "track:*" + encodeURI(data.track).replace(" ", "%20") + "*" : "*");
  if(!data.artist && !data.track) {
    cbSuccess([]);
    res.end();
  } else {
    spotify.search(
      {
        type: "track",
        query: 
          data.artist && data.artist.trim().length > 0 ? "artist:*" + encodeURI(data.artist.trim()).replace(' ', '%20') + "*" : "" +
          data.artist && data.track && data.artist.trim().length > 0 && data.track.trim().length > 0 ? " AND " : "" +
          data.track && data.track.trim().length > 0 ? "track:*" + encodeURI(data.artist.trim()).replace(' ', '%20') + "*" : "*",
        //"track:*" + encodeURI(data.track).replace(' ', '%20') + "*",
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
    return;
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
