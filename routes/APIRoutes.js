const 
    express          = require('express'),
    router           = express.Router(),
    AdminController  = require('../controllers/AdminController.js'),
    PlayerController = require('../controllers/PlayerController.js'),
    TeamController   = require('../controllers/TeamController.js'),
    SongController   = require('../controllers/SongController.js');

// restrict index for logged in user only
router.post('/player/update/team', isAuthenticated, player.updateTeam);

// restrict index for logged in user only
router.get('/players/all', isAuthenticated, player.all);

// restrict index for logged in user only
router.get('/teams/all', isAuthenticated, team.all);

// restrict index for logged in user only
router.post('/song/getTrack', isAuthenticated, song.getTrack);

// restrict index for logged in user only
router.post('/teams/create', isAuthenticated, team.create);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// AUTH //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.send('Unauthorized');
}

module.exports = router;