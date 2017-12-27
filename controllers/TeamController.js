const mongoose = require('mongoose'),
  TeamModel = require('../models/TeamModel').Model,
  TeamSchema = require('../models/TeamModel').Schema,
  TeamController = {};

TeamController.getAll = () => {
  return TeamModel.find();
};

TeamController.create = data => {
  return new TeamModel({
    name: data.name,
    color: data.color
  }).save();
};

module.exports = TeamController;
