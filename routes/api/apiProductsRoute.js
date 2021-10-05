const express = require("express");
const router = express.Router();
const apiProducts = require("../../controllers/api/apiProducts");

//prueba conexion a la base de datos 
router.get("/test",apiProducts.test);


module.exports = router;