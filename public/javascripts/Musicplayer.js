var Musicplayer = function() {}

Musicplayer.tracklist = [];
Musicplayer.currentTrack;

Musicplayer.next = function () {
    DZ.player.next();
    Musicplayer.currentTrack = Musicplayer.getCurrentTrack();
}

Musicplayer.prev = function () {
    DZ.player.prev();
    Musicplayer.currentTrack = Musicplayer.getCurrentTrack();
}

Musicplayer.play = function () {
    DZ.player.play();
}

Musicplayer.pause = function () {
    DZ.player.pause();
}

Musicplayer.getTracks = function () {
    return DZ.player.getTrackList();
}

Musicplayer.getCurrentTrack = function () {
    return DZ.player.getCurrentTrack();
}

Musicplayer.isPlaying = function() {
    return DZ.player.isPlaying();
}

Musicplayer.init = function(songs) {

    DZ.init({
        appId: '263622',
        channelUrl: 'http://localhost:3000/',
        player: {
            onload: function () {
                var allIds = [],
                    i = 0;
                for (i; i < loadjs.songs.length; i++) {
                    allIds.push(loadjs.songs[i].externalId);
                }
                if (allIds.length > 0) {
                    Musicplayer.tracks.init(allIds);
                }
            },
            width: 0,
            height: 0, 
            /*
                container: 'musicPlayer',
            */
        }
    });
}

Musicplayer.tracks = {};

Musicplayer.tracks.init = function(tracksArray) {
    Musicplayer.tracklist = tracksArray;
    DZ.player.playTracks(Musicplayer.tracklist, function() {
        Musicplayer.currentTrack = Musicplayer.getCurrentTrack();
        $('#trackname').html(Musicplayer.getCurrentTrack().title)
    });
}

Musicplayer.tracks.add = function(trackId) {
    Musicplayer.tracklist.push(trackId);
    DZ.player.addToQueue([trackId]);
}

Musicplayer.tracks.remove = function(trackId) {
    Musicplayer.tracklist.splice(Musicplayer.tracklist.indexOf(trackId), 1);
    DZ.player.playTracks(Musicplayer.tracklist);
}