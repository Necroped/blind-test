const
mongoose              = require('mongoose'),
Schema                = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

const TeamSchema = new Schema({
  name: String,
  color: String
});

let Team;
if( mongoose.models.Team ) {
    Team = mongoose.model( 'Team' );
} else {
    Team = mongoose.model( 'Team', TeamSchema );
}

module.exports = {
    Model:  Team,
    Schema: TeamSchema
};