const
  mongoose         = require("mongoose"),
  passport         = require("passport"),
  session          = require("express-session"),
  AdminModel       = require("../models/AdminModel").Model,
  AdminSchema      = require("../models/AdminModel").Schema,
  PlayerModel      = require("../models/PlayerModel").Model,
  PlayerSchema     = require("../models/PlayerModel").Schema,
  PlayerController = {};

// Restrict access to root page
PlayerController.findOne = (request, cbSuccess, cbError) => {
  PlayerModel.findOne(
    request, (err, player) => {
    if (err) {
      cbError(err);
    } else {
      cbSuccess(player);
    }
  });
}


// Post login
PlayerController.connect = (data, cbSuccess, cbError) => {
  new PlayerModel({ 
    username:  data.username,
    score:     0,
    connected: true
  })
  .save(function (err, player) {
    if (err) {
      cbError(err);
    } else {
      cbSuccess(player);
    }
  });
};

// Restrict access to root page
PlayerController.getAll = (cbSuccess, cbError) => {
  PlayerModel.find((err, players) => {
    if(err)  {
      cbError(err);
    } else {
      cbSuccess(players)
    }
  });
};

// Restrict access to root page
PlayerController.update = (data, cbSuccess, cbError) => {
  PlayerModel.update({ 
    _id: data.player_id
  }, 
  data.action, 
  (err, player) => {
    if (err) {
      cbError(err);
    } else {
      cbSuccess(players)
    }
  });
};

module.exports = PlayerController;