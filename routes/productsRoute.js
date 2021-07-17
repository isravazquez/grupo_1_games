const productsController = require("../controllers/productsController");
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require('multer');


let storage = multer.diskStorage({
    //carpeta donde almacenaremos 
    destination: (req, file, cb) => {
        let folderOfStore = path.join(__dirname,'../public/img/imagesProducts');
        cb(null, folderOfStore);
    },
    filename: (req, file, cb) => {
        //uso de fecha para nombrar los archivos
        let imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

//constante para almacenar 
let upload = multer({ storage: storage });

//vista crear producto
router.get("/createProduct", productsController.viewCreateProduct);

//vista detalle producto
router.get("/detailProduct/:id", productsController.viewDetailProduct);

//vista carrilo de compra
router.get("/shoppingCart", productsController.viewShoppingCart);

//crear producto en base de datos 
router.post("/createProduct", upload.single('imageProducto'), productsController.createProduct);

//vista listar productos
router.get("/listProducts", productsController.listProducts);

//vista edicion de produrcto
router.get("/editProduct/:id", productsController.editProduct);

//actulizar producto
router.put("/updateProduct/:id", upload.single('imageProducto'), productsController.updateProduct);

//eliminar producto
router.delete("/deleteProduct/:id", productsController.deleteProduct);

//categorias de productos
router.get("/tableros", productsController.tablerosIndex);
router.get("/maquinitas", productsController.maquinitasIndex);
router.get("/futbolitos", productsController.futbolitosIndex);
router.get("/accesorios", productsController.accesoriosIndex);


module.exports = router;
