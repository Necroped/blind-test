const
  mongoose         = require("mongoose"),
  passport         = require("passport"),
  Player           = require("../models/PlayerModel"),
  session          = require("express-session"),
  playerController = {};

// Restrict access to root page
playerController.home = (req, res) => {
  if(req.session.playerID) {
    Player.findOne({
      _id:      req.session.playerID
    }, (err, player) => {
      if (err) {
        return res.render('player/login');
      } else {
        return res.render('player/index', { 
          player : player 
        });
      }
    });
  } else {
    res.render('player/login');   
  }
};

// Go to login page
playerController.login = (req, res) => {
  res.render('player/login');
};

// Post login
playerController.doLogin = (req, res) => {
  new Player({ 
    username:  req.body.username,
    score:     0,
    connected: true
  })
  .save(function (err, player) {
    if (err) {
      return res.render('error', {
        error : err
      });
    } else {
      req.session.playerID = player.id;
      return res.render('player/index', { 
        player : player 
      });
    }
  });
};

// logout
playerController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = playerController;