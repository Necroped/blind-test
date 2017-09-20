const
  mongoose              = require('mongoose'),
  Schema                = mongoose.Schema;

const PlayerSchema = new Schema({
    username:  String,
    score:     Number,
    connected: Boolean,
    teamId:    String
});

let Player;
if( mongoose.models.Player ) {
  Player = mongoose.model( 'Player' );
} else {
  Player = mongoose.model( 'Player', PlayerSchema );
}

module.exports = Player;