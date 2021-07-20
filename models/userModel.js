const fs = require("fs");
const fs2 = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");
const userFilePath = path.join(__dirname, "users.json");

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
  },
  edit: (req, res) => {
    const users = usersModel.openFile();
    const user = users.find((u) => u.name === req.params.name);
  },
};
module.exports = usersModel;
