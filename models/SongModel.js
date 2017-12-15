const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uniqueValidator = require('mongoose-unique-validator'),
  passportLocalMongoose = require('passport-local-mongoose'),
  TeamSchema = require('../models/CategoryModel').Schema,
  ObjectId = mongoose.Schema.ObjectId;

const SongSchema = new Schema({
  artist: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  externalId: {
    type: Number,
    unique: true,
    required: true
  },
  cover: {
    type: String,
    required: false
  },
  category: {
    type: ObjectId,
    ref: 'CategorySchema'
  }
});

SongSchema.plugin(uniqueValidator, {
  message: 'Ce {PATH} {VALUE} est déjà existant.'
});

let Song;
if (mongoose.models.Song) {
  Song = mongoose.model('Song');
} else {
  Song = mongoose.model('Song', SongSchema);
}

module.exports = {
  Model: Song,
  Schema: SongSchema
};
