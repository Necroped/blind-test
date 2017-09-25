var express = require('express');
var router = express.Router();
var admin = require("../controllers/AdminController.js");
var player = require("../controllers/PlayerController.js");

// restrict index for logged in user only
router.get('/players/all', player.all);

module.exports = router;