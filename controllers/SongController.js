const SongModel = require('../models/SongModel').Model,
  SongController = {};

SongController.getTrack = data => {
  let jsonQuery = {};
  if (data.artist) {
    if (data.artist.trim().length) {
      jsonQuery.artist = encodeURI(data.artist.trim()).replace(' ', '%20');
    }
  }
  if (data.track) {
    if (data.track.trim().length) {
      jsonQuery.track = encodeURI(data.track.trim()).replace(' ', '%20');
    }
  }
  return dz.findTracks(jsonQuery);
};

SongController.add = data => {
  return new SongModel({
    artist: data.artist,
    title: data.title,
    externalId: data.externalId,
    cover: data.cover
  }).save();
};

SongController.remove = data => {
  return SongModel.remove({ externalId: data.externalId });
};

SongController.getAll = () => {
  return SongModel.find();
};

module.exports = SongController;
