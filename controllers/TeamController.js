const TeamModel = require('../models/TeamModel').Model,
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
