const usersController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

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

// Define routes
console.log("Rutas...");
router.get("/create", usersController.view);
router.post("/create", upload.single("image"), usersController.createUser);

module.exports = router;
