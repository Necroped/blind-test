const 
_config              = require("../config"),
  CategoryModel      = require("../models/CategoryModel").Model,
  CategoryController = {};


CategoryController.add = (data, cbSuccess, cbError) => {
  new CategoryModel({
    name   : data.name,
    nbSong : data.nbSong || 0
  }).save((err, player) => {
    if (err) {
      cbError(err);
    } else {
      cbSuccess(player);
    }
  });
};

CategoryController.remove = (data, cbSuccess, cbError) => {
  CategoryModel.remove(
    {
      _id: data.id
    },
    (err, Category) => {
      if (err) {
        cbError(err);
      } else {
        cbSuccess(Category);
      }
    }
  );
};

CategoryController.getAll = (cbSuccess, cbError) => {
  CategoryModel.find((err, Categories) => {
    if (err) {
      cbError(err);
    } else {
      cbSuccess(Categories);
    }
  });
};

module.exports = CategoryController;
