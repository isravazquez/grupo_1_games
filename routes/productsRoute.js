
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require('multer');

const productsController = require("../controllers/productsController");
const validacionesFormProducto = require('../middlewares/validacionesFormProducto');


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
router.get("/create", productsController.viewCreateProduct);

//vista detalle producto
router.get("/:id", productsController.viewDetailProduct);

//vista carrilo de compra
router.get("/shoppingCart", productsController.viewShoppingCart);

//crear producto en base de datos 
router.post('/', upload.any('imagesProducto'), validacionesFormProducto, productsController.createProduct);

//vista listar productos
router.get("/", productsController.listProducts);

//vista edicion de produrcto
router.get("/:id/edit", productsController.editProduct);

//actulizar producto
router.put("/:id",  upload.any('imageProducto'), validacionesFormProducto, productsController.updateProduct);

//eliminar producto
router.delete("/:id", productsController.deleteProduct);

//categorias de productos
router.get("/tableros", productsController.tablerosIndex);
router.get("/maquinitas", productsController.maquinitasIndex);
router.get("/futbolitos", productsController.futbolitosIndex);
router.get("/accesorios", productsController.accesoriosIndex);


module.exports = router;
