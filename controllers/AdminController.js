const
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    AdminModel      = require('../models/AdminModel').Model,
    AdminSchema     = require('../models/AdminModel').Schema,
    PlayerModel     = require('../models/PlayerModel').Model,
    PlayerSchema    = require('../models/PlayerModel').Schema,
    TeamModel       = require('../models/TeamModel').Model,
    TeamSchema      = require('../models/TeamModel').Schema,
    AdminController = {};


AdminController.new = (data, cbSuccess, cbError) => {
    AdminModel.register(new AdminModel({
        username: data.username
    }),
    data.password,
    (err, admin) => {
        if (err) {
            cbError(err, admin);
        } else {
            cbSuccess(admin)
        }
    });
}

module.exports = AdminController;