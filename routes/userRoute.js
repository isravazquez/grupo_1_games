const usersController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
//verificaicon de session activa
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/*
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = path.join(__dirname, "../public/img/imageUsers");
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    let name =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
let upload = multer({ storage: storage });
*/
// Define routes

router.get("/create", guestMiddleware, usersController.registerView);
router.post(
  "/create",
  /*guestMiddleware,
  upload.any("image"),*/
  usersController.register
);

router.get("/login", guestMiddleware ,usersController.loginView)
router.post("/login", guestMiddleware, usersController.login);
//ruta perfil de uauario
router.get("/profileUser", authMiddleware, usersController.profileUser);

module.exports = router;
