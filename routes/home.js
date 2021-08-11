const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const guestMiddleware = require("../middlewares/guestMiddleware");

router.get("/", mainController.home);
router.get("/login", guestMiddleware, mainController.login);
router.get("/logout", mainController.logout);
router.get("/signup", mainController.signup);
router.get("/cart", mainController.cart);

module.exports = router;
