const mainController = require("../controllers/mainController");
const express = require("express");
const router = express.Router();

router.get("/", mainController.home);
router.get("/login", mainController.login);
router.get("/cart", mainController.cart);
router.get("/product", mainController.product);

module.exports = router;