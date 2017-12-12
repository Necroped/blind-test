var Musicplayer = function() {}

Musicplayer.tracklist = [];

Musicplayer.updateDOM = function() {
    var prevTrack = Musicplayer.getPrevTrack();
    var currentTrack = Musicplayer.getCurrentTrack();
    var nextTrack = Musicplayer.getNextTrack();
    $('#trackname_prev').html('');
    $('#trackname').html('');
    $('#trackname_next').html('');

    if(prevTrack) {
        $('#trackname_prev').html('Previous : ' + prevTrack.title + ' - ' + prevTrack.artist.name);
    }
    $('#trackname').html('Current : ' + currentTrack.title + ' - ' + currentTrack.artist.name);
    if(nextTrack) {
        $('#trackname_next').html('Next : ' + nextTrack.title + ' - ' + nextTrack.artist.name);
    }

}

Musicplayer.next = function () {
    DZ.player.next()
}

Musicplayer.prev = function () {
    DZ.player.prev()
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

Musicplayer.getPrevTrack = function() {
    return DZ.player.getCurrentIndex() > 0 ? DZ.player.getTrackList()[DZ.player.getCurrentIndex() - 1] : false;
}
Musicplayer.getCurrentTrack = function() {
    return DZ.player.getCurrentTrack();
}
Musicplayer.getNextTrack = function() {
    return DZ.player.getCurrentIndex() < DZ.player.getTrackList().length - 1 ? DZ.player.getTrackList()[DZ.player.getCurrentIndex() + 1] : false;
};

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

    DZ.Event.subscribe('current_track', function(track, evt_name) {
        Musicplayer.updateDOM();
    });
}

Musicplayer.tracks = {};

Musicplayer.tracks.init = function(tracksArray) {
    Musicplayer.tracklist = tracksArray;
    DZ.player.playTracks(Musicplayer.tracklist, function(allTracks) {
    });
}

Musicplayer.tracks.add = function(trackId) {
    Musicplayer.tracklist.push(trackId);
    DZ.player.addToQueue([trackId], function(allTracks) {
    });
}

Musicplayer.tracks.remove = function(trackId) {
    Musicplayer.tracklist.splice(Musicplayer.tracklist.indexOf(trackId), 1);
    DZ.player.playTracks(Musicplayer.tracklist, function(allTracks) {
    });
}