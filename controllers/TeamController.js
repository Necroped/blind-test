const
mongoose        = require("mongoose"),
Team           = require("../models/TeamModel").Model,
TeamSchema     = require("../models/TeamModel").Schema,
teamController = {};


// Restrict access to root page
teamController.all = (req, res) => {
    Team.find((err, teams) => {
        if(err)  {
            res.send(err);
        }
        res.json({
            'data': teams
        });
    });
  };

module.exports = teamController;