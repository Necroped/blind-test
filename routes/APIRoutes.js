var express = require('express');
var router = express.Router();
var admin = require("../controllers/AdminController.js");
var player = require("../controllers/PlayerController.js");
var team = require("../controllers/TeamController.js");

// restrict index for logged in user only
router.get('/players/all', player.all);

// restrict index for logged in user only
router.get('/teams/all', team.all);

module.exports = router;