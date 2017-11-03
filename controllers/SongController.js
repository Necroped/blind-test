const
    Spotify = require('node-spotify-api'),
    _config = require('../config'),
    spotify = new Spotify({
        id:     _config.spotify.id,
        secret: _config.spotify.secret
    }),
    SongController = {};

SongController.getTrack = (data, cbSuccess, cbError) => {
    spotify.search({ 
        type: 'track', 
        query: data.track,
        limit: 50
    }, (err, data) => {
        if (err) {
            cbError(err);
        } else {
            cbSuccess(data);
        }
    });
}

module.exports = SongController;
