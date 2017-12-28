const AdminModel = require('../models/AdminModel').Model,
  AdminController = {};

AdminController.new = data => {
  return AdminModel.register(
    new AdminModel({
      username: data.username
    }),
    data.password
  );
};

module.exports = AdminController;
