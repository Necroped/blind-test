const
    mongoose   = require('mongoose'),
    Schema     = mongoose.Schema,
    TeamSchema = require("../models/TeamModel").Schema,
    ObjectId = mongoose.Schema.ObjectId;

const PlayerSchema = new Schema({
    username:  { type: String , unique: true, required: true },
    score:     { type: Number },
    connected: { type: Boolean },
    team:      { type: ObjectId, ref: 'TeamSchema' },
    socket:    { type: String, unique: true}
});

let Player;
if( mongoose.models.Player ) {
    Player = mongoose.model( 'Player' );
} else {
    Player = mongoose.model( 'Player', PlayerSchema );
}

module.exports = {
    Model:  Player,
    Schema: PlayerSchema
};