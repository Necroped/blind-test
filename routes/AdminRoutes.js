const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  AdminController = require('../controllers/AdminController.js'),
  PlayerController = require('../controllers/PlayerController.js'),
  TeamController = require('../controllers/TeamController.js');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// GET //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/', isAuthenticated, (req, res) => {
  res.render('admin/index', {
    admin: req.user
  });
});

router.get('/players', isAuthenticated, (req, res) => {
  res.render('admin/players', {
    admin: req.user
  });
});

router.get('/teams', isAuthenticated, (req, res) => {
  let playersWithoutTeam, teams;
  Promise.all([
    TeamController.getAll().then(data => {
      teams = data;
    }),
    PlayerController.getAll({ team: { $exists: false }}).then(data => {
      playersWithoutTeam = data;
    })
  ]).then(data => {
    res.render('admin/teams', {
      admin: req.user,
      teams: teams,
      playersWithoutTeam : playersWithoutTeam
    });
  })
});

router.get('/songs', isAuthenticated, (req, res) => {
  res.render('admin/songs', {
    admin: req.user
  });
});

router.get('/register', isAuthenticated, (req, res) => {
  res.render('admin/register');
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('admin/login');
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// POST //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/register', isAuthenticated, (req, res) => {
  AdminController.new({
    username: req.body.username,
    password: req.body.password
  }).then(data => {
    res.redirect('/admin', {
      admin: data
    });
  });
});

router.post('/team/create', isAuthenticated, (req, res) => {
  TeamController.create({
    name: req.body.name,
    color: req.body.color
  }).then(data => {
    res.json(data);
  });
});

router.post('/login', (req, res) => {
  passport.authenticate('local')(req, res, () => {
    res.redirect('/admin');
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// AUTH //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.redirect('/admin/login');
}

module.exports = router;
