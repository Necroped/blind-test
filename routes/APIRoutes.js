var express = require('express');
var router  = express.Router();
var admin   = require("../controllers/AdminController.js");
var player  = require("../controllers/PlayerController.js");
var team    = require("../controllers/TeamController.js");
var song    = require("../controllers/SongController.js");

// restrict index for logged in user only
router.post('/player/update/team', player.updateTeam);

// restrict index for logged in user only
router.get('/players/all', player.all);

// restrict index for logged in user only
router.get('/teams/all', team.all);

// restrict index for logged in user only
router.post('/song/getTrack', song.getTrack);

// restrict index for logged in user only
router.post('/teams/create', team.create);

module.exports = router;