const userModel = require("../models/userModel");

const usersController = {
  view: (req, res) => {
    res.render("signup2");
  },
  createUser: (req, res) => {
    const users = userModel.write(req, res);
    res.status(200);
    res.redirect("/");
  },
};

module.exports = usersController;
