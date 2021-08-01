const userModel = require("../models/usersModel");

const usersController = {
  view: (req, res) => {
    res.render("signup2");
    console.log("Rendericé");
  },
  createUser: (req, res) => {
    // console.log("Salí del modelo");
    const users = userModel.norepeated(req, res);
    // res.status(200);
    // res.redirect("/");
  },
  loginUser: (req, res) => {
    const users = userModel.login(req, res);
    // res.status(200);
    // res.redirect("/");
  },
};

module.exports = usersController;
