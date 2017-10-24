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
  Player.findOne({
    _id:      req.session.player._id
  }, (err, player) => {
    if (err) {
      res.redirect('/player/login');
    } else {
      res.render('player/index', { 
        player : player 
      });
    }
  });
}

// Go to login page
playerController.login = (req, res) => {
  res.render('player/login');
}

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
      req.session.player = player;
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
    res.json({
      'data': players
    });
  });
};

// Restrict access to root page
playerController.updateTeam = (req, res) => {
  let action;
  if(req.body.team_id.length > 0) {
    action = { 
      $set: { 
        team: req.body.team_id 
      }
    };
  } else {
    action = { 
      $unset: { 
        team: true 
      }
    };
  }
  Player.update({ 
    _id: req.body.player_id 
  }, 
  action, 
  (err, player) => {
    res.json({
      success : true
    })
  });
};

module.exports = playerController;