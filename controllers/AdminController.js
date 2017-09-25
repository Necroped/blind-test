const
  mongoose        = require("mongoose"),
  passport        = require("passport"),
  Admin           = require("../models/AdminModel").Model,
  AdminSchema     = require("../models/AdminModel").Schema,
  Player          = require("../models/PlayerModel").Model,
  PlayerSchema    = require("../models/PlayerModel").Schema,
  adminController = {};



// Restrict access to root page
adminController.home = (req, res) => {
  if(req.user) {
    Player.find((err, players) => {
      res.render( 'admin/index', { 
        admin : req.user,
        players : players
      });
    });
  } else {
    res.redirect('admin/login');   
  }
};

// Go to registration page
adminController.register = (req, res) => {
  res.render('admin/register');
};

// Post registration
adminController.doRegister = (req, res) => {
  Admin.register( new Admin({ 
    username : req.body.username
  }), 
  req.body.password, 
  (err, admin) => {
    if (err) {
      res.redirect('/admin', { 
        admin : admin 
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