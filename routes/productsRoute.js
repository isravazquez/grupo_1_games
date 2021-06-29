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

//vista listar productos
router.get("/listProducts", productsController.listProducts);

//vista edicion de produrcto
router.get("/editProduct/:id", productsController.editProduct);

//actulizar producto
router.put("/updateProduct/:id", productsController.updateProduct);

//eliminar producto
router.delete("/deleteProduct/:id", productsController.deleteProduct);


module.exports = router;
