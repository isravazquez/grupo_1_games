const mainController = require("../controllers/mainController");
const express = require("express");
const router = express.Router();

router.get("/", mainController.home);
router.get("/login", mainController.login);
router.get("/signup", mainController.signup);
router.get("/cart", mainController.cart);

module.exports = router;
