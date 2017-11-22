const 
    mongoose              = require('mongoose'),
    Schema                = mongoose.Schema,
    uniqueValidator       = require('mongoose-unique-validator'),
    passportLocalMongoose = require('passport-local-mongoose');

const SongSchema       = new Schema({
  artist    : { type : String, required : true },
  title     : { type : String, required : true  },
  idSpotify : { type  : String, unique : true, required : true }
});

SongSchema.plugin(passportLocalMongoose);
SongSchema.plugin(uniqueValidator, {
  message : 'Ce {PATH} {VALUE} est déjà existant.'
});

let Song;
if (mongoose.models.Song) {
    Song = mongoose.model('Song');
} else {
    Song = mongoose.model('Song', SongSchema);
}

module.exports = {
    Model                 : Song,
    Schema                : SongSchema
};
