const fs = require("fs");
const fs2 = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const userFilePath = path.join(__dirname, "../data/users.json");

const usersModel = {
  openFile: () => {
    const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
    return users;
  },
  write: (req, res) => {
    const users = usersModel.openFile();
    const id = users.length;
    const userInfo = {
      id: id + 1,
      ...req.body,
      password: bcrypt.hashSync(req.body.password),
    };
    users.push(userInfo);
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, " "));
    console.log("User added");
    res.redirect("/");
  },
  edit: (req, res) => {
    const users = usersModel.openFile();
    const user = users.find((u) => u.name === req.params.name);
  },
  login: (req, res) => {
    const users = usersModel.openFile();
    const user = users.find((u) => u.email === req.body.email);
    if (user !== undefined) {
      const check1 = bcrypt.compareSync(req.body.password, user.password);
      if (check1) {
        console.log(`User ${user.name} logged in`);
        let usuarioLogeado = user;
        req.session.logged = usuarioLogeado;
        // res.cookie("logged", "true", { maxAge: 900000, signup: "true" });
        // let logged = req.session.logged;
        res.render("home", { user, logged: true });
      } else {
        console.log("Wrong password");
        res.redirect("/login");
      }
    } else {
      console.log("User not found");
      res.redirect("/login");
    }
  },
  norepeated: (req, res) => {
    const users = usersModel.openFile();
    const user = users.find((u) => u.email === req.body.email);
    if (user !== undefined) {
      res.render("signup2", { user, repeated: true });
    } else {
      usersModel.write(req, res);
    }
  },
};
module.exports = usersModel;
