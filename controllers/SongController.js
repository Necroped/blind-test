const
    Spotify = require('node-spotify-api'),
    spotify = new Spotify({
        id: "3e48054fb42c469bbc677f6e6b4e9e5d",
        secret: "bd817ef7b478466785fa82f24b74fdd9"
    }),
    songController = {};

songController.getTrack = (req, res) => {
    var track = req.body.track;
    console.log(track);
    if (track == "azertyuiop") {
        res.json({
            data : [{
                title : "",
                artist : "",
                jacket : ""
            }]
        });
    } else {
        spotify.search({ 
            type: 'track', 
            query: track,
            limit: 50
        }, (err, data) => {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            var items = data.tracks.items;
    
            items.sort(function(a, b) {
                return b.popularity - a.popularity;
            })
            items = items.splice(0, 10);

            for (i = 0; i < items.length; ++i) {

                items[i] = {
                    title : items[i].name,
                    artist : items[i].artists[0].name,
                    jacket : items[i].album.images[0].url
                }
            }

            res.json({
                data : items
            });
        });
    }
}

module.exports = songController;
