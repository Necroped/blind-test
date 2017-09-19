const
  mongoose         = require("mongoose"),
  passport         = require("passport"),
  Player           = require("../models/PlayerModel"),
  playerController = {};

// Restrict access to root page
playerController.home = (req, res) => {
  res.render( 'index', { 
    playername : req.playername 
  });
};

// Post registration
playerController.doRegister = (req, res) => {
  Player.register(new Player({ 
    playername : req.body.playername,
    score : 0
  }),
  (err, player) => {
    if (err) {
      return res.render('register', { 
        player : player 
      });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
};

// Go to login page
playerController.login = (req, res) => {
  res.render('login');
};

// Post login
playerController.doLogin = (req, res) => {
  passport.authenticate('local')(req, res, () => {
    res.redirect('/');
  });
};

// logout
playerController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = playerController;