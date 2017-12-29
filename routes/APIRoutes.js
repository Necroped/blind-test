const express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController.js'),
  PlayerController = require('../controllers/PlayerController.js'),
  TeamController = require('../controllers/TeamController.js'),
  CategoryController = require('../controllers/CategoryController.js'),
  SongController = require('../controllers/SongController.js');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// GET //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/players/all', (req, res) => {
  PlayerController.getAll().then(data => {
    res.json(data);
  });
});

router.get('/teams/all', (req, res) => {
  TeamController.getAll().then(data => {
    res.json(data);
  });
});

router.get('/songs/all', (req, res) => {
  SongController.getAll().then(data => {
    res.json(data);
  });
});

router.get('/categories/all', (req, res) => {
  CategoryController.getAll().then(data => {
    res.json(data);
  });
});

router.post('/player/get', (req, res) => {
  PlayerController.findOne({
    _id: req.body._id
  }).then(data => {
    res.json(data);
  });
});

router.post('/modal', (req, res) => {
  res.render('admin/modals/' + req.body.modal, req.body.params);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// POST //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/player/update/team', (req, res) => {
  let player_id = req.body.player_id,
    team_id = req.body.team_id;
  Promise.all([
    PlayerController.update({
      player_id: player_id,
      action: { $set: { team: team_id } }
    }),
    TeamController.update({
      action: { $pull: { players: player_id } }
    }),
    TeamController.update({
      team_id: team_id,
      action: { $push: { players: player_id } }
    })
  ]).then(data => {
    res.json(data);
  });
});

router.post('/teams/create', (req, res) => {
  TeamController.create({
    name: req.body.name,
    color: req.body.color
  }).then(data => {
    res.json(data);
  });
});

router.post('/songs/all', (req, res) => {
  SongController.getAll().then(data => {
    res.json(data);
  });
});

router.post('/song/getTrack', isAuthenticated, (req, res) => {
  SongController.getTrack({
    track: req.body.track,
    artist: req.body.artist
  }).then(data => {
    if (data.length == 0) {
      res.json(data);
    } else {
      let items = data.data,
        result = [],
        i;
      if (items && items.length > 0) {
        items = items.sort((a, b) => {
          return b.rank - a.rank;
        });

        for (i = 0; i < items.length; i++) {
          result.push({
            title: items[i].title,
            artist: items[i].artist.name,
            cover: items[i].album.cover_small,
            externalId: items[i].id
          });
        }
      }
      res.json(result);
    }
  });
});

router.post('/song/add', isAuthenticated, (req, res) => {
  SongController.add({
    artist: req.body.artist,
    title: req.body.title,
    externalId: req.body.externalId,
    cover: req.body.cover
  }).then(data => {
    res.json(data);
  });
});

router.post('/song/remove', isAuthenticated, (req, res) => {
  SongController.remove({
    externalId: req.body.externalId
  }).then(data => {
    res.json(data);
  });
});

router.post('/category/add', isAuthenticated, (req, res) => {
  CategoryController.add({
    name: req.body.name,
    nbSong: req.body.nbSong
  }).then(data => {
    res.json(data);
  });
});

router.post('/category/remove', isAuthenticated, (req, res) => {
  CategoryController.remove({
    id: req.body.id
  }).then(data => {
    res.json(data);
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
