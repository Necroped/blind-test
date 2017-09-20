var express = require('express');
var router = express.Router();
var player = require("../controllers/PlayerController.js");

// restrict index for logged in user only
router.get('/', player.home);

// route to login page
router.get('/login', player.login);

// route for login action
router.post('/login', player.doLogin);

// route for logout action
router.get('/logout', player.logout);

module.exports = router;
