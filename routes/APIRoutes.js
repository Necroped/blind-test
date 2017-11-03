const 
    express          = require('express'),
    router           = express.Router(),
    AdminController  = require("../controllers/AdminController.js"),
    PlayerController = require("../controllers/PlayerController.js"),
    TeamController   = require("../controllers/TeamController.js"),
    SongController   = require("../controllers/SongController.js");


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// GET //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/players/all', (req, res) => {
    PlayerController.getAll((data) => {
        res.json({
            'data': data
        });
    }, (err) => {
        res.send(err);
    })
});

router.get('/teams/all', (req, res) => {
    TeamController.getAll((data) => {
        res.json({
            'data': data
        });
    }, (err) => {
        res.send(err);
    })
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// POST //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/player/update/team', (req, res) => {
    let 
        player_id = req.body.player_id,
        team_id   = req.body.team_id,
        action    = team_id.length > 0 ? { $set : { team: team_id } } : { $unset : { team: true } };
    PlayerController.updateTeam({
        player_id: player_id,
        action:    action
    }, (data) => {
        res.json({
            success : true
        })
    })
});

router.post('/teams/create', (req, res) => {
    if(!req.body.name || !req.body.color) {
        res.json({
            error: "Name and Color must be defined",
            admin: req.user
        });
    } else {
        TeamController.create({
            name : req.body.name,
            color : req.body.color
        }, (data) => {
            res.json({
                admin : req.user
            })
        }, (err) => {
            res.json({
                error : err,
                admin : req.user
            })
        })
    }
});

router.post('/song/getTrack', isAuthenticated, (req, res) => {
    SongController.getTrack({
        track : req.body.track
    }, (data) => {
        let items = data.tracks.items;
        items.sort((a, b) => {
            return b.popularity - a.popularity;
        })
        items = items.splice(0, 10);

        for (i = 0; i < items.length; ++i) {
            items[i] = {
                title:  items[i].name,
                artist: items[i].artists[0].name,
                jacket: items[i].album.images[0].url
            }
        }
        res.json({
            data: items
        });
    }, (err, data) => {
        res.json({
            error: err
        });
    })
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