const PlayerModel = require('../models/PlayerModel').Model,
  PlayerController = {};

// Restrict access to root page
PlayerController.findOne = request => {
  return PlayerModel.findOne(request);
};

// Post login
PlayerController.connect = data => {
  return new PlayerModel({
    username: data.username,
    score: 0,
    connected: true
  }).save();
};

// Restrict access to root page
PlayerController.getAll = data => {
  return PlayerModel.find(data);
};

// Restrict access to root page
PlayerController.update = data => {
  return PlayerModel.update({ _id: data.player_id }, data.action);
};

module.exports = PlayerController;
