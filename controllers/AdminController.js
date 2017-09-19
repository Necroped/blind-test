const
  mongoose        = require("mongoose"),
  passport        = require("passport"),
  Admin           = require("../models/AdminModel"),
  adminController = {};

// Restrict access to root page
adminController.home = (req, res) => {
  if(req.user) {
     res.render( 'index', { 
      admin : req.user 
    });
  } else {
    res.render('login');   
  }
};

// Go to registration page
adminController.register = (req, res) => {
  res.render('register');
};

// Post registration
adminController.doRegister = (req, res) => {
  Admin.register( new Admin({ 
    username : req.body.username
  }), 
  req.body.password, 
  (err, admin) => {
    if (err) {
      return res.render('register', { 
        admin : admin 
      });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/admin/');
    });
  });
};

// Go to login page
adminController.login = (req, res) => {
  res.render('login');
};

// Post login
adminController.doLogin = (req, res) => {
  passport.authenticate('local')(req, res, () => {
    res.redirect('/admin/');
  });
};

// logout
adminController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = adminController;