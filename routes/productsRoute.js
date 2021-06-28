const productsController = require("../controllers/productsController");
const express = require("express");
const router = express.Router();

//vista crear producto
router.get("/createProduct", productsController.viewCreateProduct);

//vista detalle producto
router.get("/detailProduct", productsController.viewDetailProduct);

//vista carrilo de compra
router.get("/shoppingCart", productsController.viewShoppingCart);

//crear producto en base de datos 
router.post("/createProduct", productsController.createProduct);

module.exports = router;
