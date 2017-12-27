const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uniqueValidator = require('mongoose-unique-validator'),
  passportLocalMongoose = require('passport-local-mongoose');

const AdminSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String }
});

AdminSchema.plugin(passportLocalMongoose);
AdminSchema.plugin(uniqueValidator, {
  message: 'Un admin avec pour {PATH} {VALUE} est déjà existant.'
});

let Admin;
if (mongoose.models.Admin) {
  Admin = mongoose.model('Admin');
} else {
  Admin = mongoose.model('Admin', AdminSchema);
}

module.exports = {
  Model: Admin,
  Schema: AdminSchema
};
