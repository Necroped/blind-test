const
  mongoose              = require('mongoose'),
  Schema                = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

const PlayerSchema = new Schema({
    playername : String,
    score : Integer
});

PlayerSchema.plugin( passportLocalMongoose );

let Player;
if( mongoose.models.Player ) {
  Player = mongoose.model( 'Player' );
} else {
  Player = mongoose.model( 'Player', PlayerSchema );
}

module.exports = Player;