const CategoryModel = require('../models/CategoryModel').Model,
  CategoryController = {};

CategoryController.add = data => {
  return new CategoryModel({
    name: data.name,
    nbSong: data.nbSong || 0
  }).save();
};

CategoryController.remove = data => {
  return CategoryModel.remove({ _id: data.id });
};

CategoryController.getAll = () => {
  return CategoryModel.find();
};

module.exports = CategoryController;
