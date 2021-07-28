const userModel = require("../models/usersModel");

const usersController = {
  view: (req, res) => {
    res.render("signup2");
    console.log("Rendericé");
  },
  createUser: (req, res) => {
    console.log("Salí del modelo");
    const users = userModel.write(req, res);

    res.status(200);
    res.redirect("/");
  },
};

module.exports = usersController;
