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

// Restrict access to root page
teamController.create = (req, res) => {
    if(!req.body.name || !req.body.color) {
        res.render('admin/teams', {
            error : "Name and Color must be defined",
            admin : req.user
        });
    } else {

/*         Team.findOne({
            name:  req.body.name,
            color: req.body.color
        }, (err, team) => {
            if (err) {
                res.render('/error', {
                    error : err
                });
            } else if(!team) { */
                new Team({ 
                    name:  req.body.name,
                    color: req.body.color
                })
                .save(function (err, team) {
                    if (err) {
                        res.render('admin/teams', {
                            error : err,
                            admin : req.user
                        });
                    } else {
                        res.render('admin/teams', {
                            admin : req.user
                        });
                    }
                });
         /*    } else {
                res.render('admin/teams', {
                    admin : req.user,
                    error : 'Team already exists'
                })
            }
        }); */
    }   
};

module.exports = teamController;