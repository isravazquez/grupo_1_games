// const userModel = require("../models/usersModel");
// const db = require("../database/models");
// const usersController = {
//   view: (req, res) => {
//     res.render("signup2");
//     console.log("Rendericé");
//   },
//   createUser: (req, res) => {
//     // console.log("Salí del modelo");
//     const users = userModel.norepeated(req, res);
//     // res.status(200);
//     // res.redirect("/");
//   },
//   loginUser: (req, res) => {
//     const users = userModel.login(req, res);
//     // res.status(200);
//     // res.redirect("/");
//   },
//   profileUser: (req, res) => {
//     // res.status(200);
//     res.render("profileUser");
//   },
// };

// module.exports = usersController;
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const usersController = {
  profileUser: function (req, res, next) {
    res.render("profileUser", {
      user: req.session.userLogged,
    });
  },
  loginView: function (req, res, next) {
    res.render("login2");
  },
  login: async function (req, res, next) {
    let userToLogin = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (userToLogin) {
      let passwordValidation = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (passwordValidation) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        if (req.body.rememberUser) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
        }
        return res.redirect("/");
      }
      return res.render("login2", {
        errors: {
          password: {
            msg: "La contraseña es incorrecta",
          },
        },
      });
    }
    return res.render("login2", {
      errors: {
        email: {
          msg: "Este correo no está registrado",
        },
      },
    });
  },
  registerView: function (req, res, next) {
    res.render("signup2");
  },
  register: async function (req, res, next) {
    // check if exist validation erros
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length) {
      return res.render("signup2", {
        errors: resultValidation.mapped(),
        data: req.body,
      });
    }
    // check if email to register is in DB
    let userInDB = await db.User.findOne({ where: { email: req.body.email } });
    if (userInDB) {
      return res.render("signup2", {
        errors: {
          email: {
            msg: "Este correo ya esta registrado",
          },
        },
        data: req.body,
      });
    }
    // Finally register new user
    let userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
    };

    let userCreated = await db.User.create({ ...userToCreate });
    return res.redirect("/users/login");
  },
  logout: function (req, res, next) {
    req.session.destroy();
    res.clearCookie("userEmail");
    return res.redirect("/");
  },
};
module.exports = usersController;
