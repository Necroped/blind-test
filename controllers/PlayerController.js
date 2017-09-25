const
  mongoose         = require("mongoose"),
  passport         = require("passport"),
  Admin            = require("../models/AdminModel").Model,
  AdminSchema      = require("../models/AdminModel").Schema,
  Player           = require("../models/PlayerModel").Model,
  PlayerSchema     = require("../models/PlayerModel").Schema,
  session          = require("express-session"),
  playerController = {};

// Restrict access to root page
playerController.home = (req, res) => {
  if(req.session.playerID) {
    Player.findOne({
      _id:      req.session.playerID
    }, (err, player) => {
      if (err) {
        res.redirect('/player/login');
      } else {
        res.render('player/index', { 
          player : player 
        });
      }
    });
  } else {
    res.redirect('/player/login');   
  }
};

// Go to login page
playerController.login = (req, res) => {
  if(!req.session.playerID) {
    res.render('player/login');
  } else {
    res.redirect('/player');
  }
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
      res.render('error', {
        error : err
      });
    } else {
      req.session.playerID = player.id;
      res.redirect('/player');
    }
  });
};

// logout
playerController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

// Restrict access to root page
playerController.all = (req, res) => {
  Player.find((err, players) => {
    if(err)  {
      res.send(err);
    }
    console.log(players);
    res.json({'data': players});
  });
};


module.exports = playerController;