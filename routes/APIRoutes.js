var express = require('express');
var router  = express.Router();
var admin   = require("../controllers/AdminController.js");
var player  = require("../controllers/PlayerController.js");
var team    = require("../controllers/TeamController.js");
var song    = require("../controllers/SongController.js");

// restrict index for logged in user only
router.post('/player/update/team', isAuthenticated, player.updateTeam);

// restrict index for logged in user only
router.get('/players/all', isAuthenticated, player.all);

// restrict index for logged in user only
router.get('/teams/all', isAuthenticated, team.all);

// restrict index for logged in user only
router.post('/song/getTrack', isAuthenticated, song.getTrack);

// restrict index for logged in user only
router.post('/teams/create', isAuthenticated, team.create);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// AUTH //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.send('Unauthorized');
}

module.exports = router;