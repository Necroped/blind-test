const TeamModel = require('../models/TeamModel').Model,
  TeamController = {};

TeamController.getAll = () => {
  return TeamModel.find()
    .populate('players')
    .exec();
};

TeamController.create = data => {
  return new TeamModel({
    name: data.name,
    color: data.color
  }).save();
};

TeamController.update = data => {
  let findOption = data.team_id ? { _id: data.team_id } : {};
  let action = data.action ? data.action : {};
  return TeamModel.update(findOption, action);
};
module.exports = TeamController;
