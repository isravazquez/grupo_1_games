const userModel = require("../models/usersModel");

const usersController = {
  view: (req, res) => {
    res.render("signup2");
  },
  createUser: (req, res) => {
    const users = userModel.write(req, res);
    console.log("Salí del modelo");
    res.status(200);
    res.redirect("/");
  },
};

module.exports = usersController;
