const
mongoose       = require("mongoose"),
TeamModel      = require("../models/TeamModel").Model,
TeamSchema     = require("../models/TeamModel").Schema,
TeamController = {};

TeamController.getAll = (cbSuccess, cbError) => {
    TeamModel.find((err, teams) => {
        if(err)  {
            cbError(err);
        } else {
            cbSuccess(teams);
        }
    });
};

TeamController.create = (data, cbSuccess, cbError) => {
    new TeamModel({ 
        name:  data.name,
        color: data.color
    }).save((err, team) => {
        if (err) {
            cbError(err);
        } else {
           cbSuccess(team);
        }
    });
};

module.exports = TeamController;