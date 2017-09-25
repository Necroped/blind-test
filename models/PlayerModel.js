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

PlayerSchema.pre('save', function (next) {
  this._wasnew = this.isNew;
  next();
});
PlayerSchema.post('save', function () {
  if (this._wasnew) this.emit('new')
  else this.emit('update');
});


module.exports = {
  Model:  Player,
  Schema: PlayerSchema
};