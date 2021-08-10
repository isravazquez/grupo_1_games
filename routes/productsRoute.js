
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require('multer');

const productsController = require("../controllers/productsController");
const validacionesFormProducto = require('../middlewares/validacionesFormProducto');
const authMiddleware = require('../middlewares/authMiddleware');


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

//categorias de productos
router.get("/tableros", productsController.tablerosIndex);
router.get("/maquinitas", productsController.maquinitasIndex);
router.get("/futbolitos", productsController.futbolitosIndex);
router.get("/accesorios", productsController.accesoriosIndex);

//constante para almacenar 
let upload = multer({ storage: storage });

//vista crear producto
router.get("/create",authMiddleware, productsController.viewCreateProduct);

//vista detalle producto
router.get("/:id",authMiddleware ,productsController.viewDetailProduct);

//vista carrilo de compra
router.get("/shoppingCart", productsController.viewShoppingCart);

//crear producto en base de datos 
router.post('/',authMiddleware , upload.any('imagesProducto'), validacionesFormProducto, productsController.createProduct);

//vista listar productos
router.get("/", productsController.listProducts);

//vista edicion de produrcto
router.get("/:id/edit",authMiddleware, productsController.editProduct);

//actulizar producto
router.put("/:id",authMiddleware,upload.any('imageProducto'), validacionesFormProducto, productsController.updateProduct);

//eliminar producto
router.delete("/:id",authMiddleware ,productsController.deleteProduct);


module.exports = router;
