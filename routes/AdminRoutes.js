var express = require('express');
var router = express.Router();
var admin = require("../controllers/AdminController.js");

// restrict index for logged in user only
router.get('/', admin.home);

// route to register page
router.get('/register', admin.register);

// route for register action
router.post('/register', admin.doRegister);

// route to login page
router.get('/login', admin.login);

// route for login action
router.post('/login', admin.doLogin);

// route for logout action
router.get('/logout', admin.logout);

module.exports = router;