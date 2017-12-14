const mongoose = require("mongoose"),
Schema = mongoose.Schema,
uniqueValidator = require("mongoose-unique-validator"),
passportLocalMongoose = require("passport-local-mongoose");

const CategorySchema = new Schema({
  name   : { type : String, required : true, unique : true },
  nbSong : { type : Number, required : true }
});

CategorySchema.plugin(uniqueValidator, {
    message: "Ce {PATH} {VALUE} est déjà existant."
});

let Category;
if (mongoose.models.Category) {
    Category = mongoose.model("Category");
} else {
    Category = mongoose.model("Category", CategorySchema);
}

module.exports = {
    Model  : Category,
    Schema : CategorySchema
};
