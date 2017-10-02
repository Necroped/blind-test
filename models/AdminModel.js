const
  mongoose              = require('mongoose'),
  Schema                = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

const AdminSchema = new Schema({
    username: String,
    password: String
});

AdminSchema.plugin( passportLocalMongoose );

let Admin;
if( mongoose.models.Admin ) {
  Admin = mongoose.model( 'Admin' );
} else {
  Admin = mongoose.model( 'Admin', AdminSchema );
}

module.exports = {
  Model:  Admin,
  Schema: AdminSchema
};