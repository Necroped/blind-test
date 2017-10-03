const
  mongoose        = require("mongoose"),
  passport        = require("passport"),
  Admin           = require("../models/AdminModel").Model,
  AdminSchema     = require("../models/AdminModel").Schema,
  Player          = require("../models/PlayerModel").Model,
  PlayerSchema    = require("../models/PlayerModel").Schema,
  Team            = require("../models/TeamModel").Model,
  TeamSchema      = require("../models/TeamModel").Schema,
  adminController = {};



// Restrict access to root page
adminController.home = (req, res) => {
  res.render( 'admin/index', { 
    admin:   req.user
  });
};

// Restrict access to root page
adminController.players = (req, res) => {
  res.render( 'admin/players', { 
    admin:   req.user
  });
};

// Restrict access to root page
adminController.teams = (req, res) => {
  res.render( 'admin/teams', { 
    admin:   req.user
  });
};

// Go to registration page
adminController.register = (req, res) => {
  res.render('admin/register');
};

// Post registration
adminController.doRegister = (req, res) => {
  Admin.register( new Admin({ 
    username: req.body.username
  }), 
  req.body.password, 
  (err, admin) => {
    if (err) {
      res.redirect('/admin', { 
        admin: admin 
      });
    }
  });
};

// Go to login page
adminController.login = (req, res) => {
  res.render('admin/login');
};

// Post login
adminController.doLogin = (req, res) => {
  passport.authenticate('local')(req, res, () => {
    res.redirect('/admin');
  });
};

// logout
adminController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = adminController;