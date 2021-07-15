const usersController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

// Define routes
router.get("/create", usersController.view);
router.post("/create", usersController.createUser);

module.exports = router;
