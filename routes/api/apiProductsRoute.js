const express = require("express");
const router = express.Router();
const apiProducts = require("../../controllers/api/apiProducts");

//prueba conexion a la base de datos 
router.get("/test",apiProducts.test);

//listar productos
router.get("/listProducts", apiProducts.listProducts);

//detalle producto
router.get("/deteilProduct/:id", apiProducts.deteilProduct);

//crear producto en base de datos 
router.post('/createProduct', apiProducts.createProduct);

//actulizar producto
router.put("/update/:id", apiProducts.updateProduct);

//eliminar producto
router.delete("/delete/:id", apiProducts.deleteProduct);


module.exports = router;