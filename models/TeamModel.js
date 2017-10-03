const
    mongoose              = require('mongoose'),
    Schema                = mongoose.Schema,
    uniqueValidator       = require('mongoose-unique-validator'),
    passportLocalMongoose = require('passport-local-mongoose');
     
    
const TeamSchema = new Schema({
    name:  { type : String , unique : true, required : true },
    color: { type : String , unique : true, required : true }
});

TeamSchema.plugin(uniqueValidator, { message: 'Une équipe avec pour {PATH} {VALUE} est déjà existante.' });

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