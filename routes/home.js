const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.home);
router.get("/login", mainController.login);
router.get("/signup", mainController.signup);
router.get("/cart", mainController.cart);



module.exports = router;
