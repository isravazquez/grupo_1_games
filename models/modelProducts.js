const fs = require("fs");
//para aliminar archivos
const fs2 = require("fs").promises;
const path = require("path");
const userFilePath = path.join(__dirname, "products.json");

let modelProducts = {
  openFile: function () {
    //apertura de archivo
    const products = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
    return products;
  },
  writeProducts: (req, res) => {
    //abriendo la base de datos json
    const products = modelProducts.openFile();
    //Recuperando los datos del formulario
    const productInfo = req.body;
    //agregando la información al array
    products.push(productInfo);
    //escritura de archivo a la base de datos json, convirtiendo el array a json.
    fs.writeFileSync(userFilePath, JSON.stringify(products, null, " "));
  },
  buscarProducto: function (listaProductos, req) {
    let productoEncontrado = listaProductos.find((producto) => {
      return producto.id == parseInt(req.params.id);
    });
    return productoEncontrado;
  },
  buscarIndice: function (listaProductos, req) {
    let indice = listaProductos.findIndex((producto) => {
      return producto.id == parseInt(req.params.id);
    });

    return indice;
  },
  eliminarArchivoImagen: function (nombreImagen) {
    let rutaImagen = path.join(
      __dirname,
      "../public/img/imagesProducts/" + nombreImagen
    );

    //console.log(rutaImagen);
    fs2
      .unlink(rutaImagen)
      .then(() => {
        console.log("Se elimino archivo de imagen... al actuliar datos");
      })
      .catch((err) => {
        console.error("No se pudo eliminar el archivo no exite", err);
      });
  },
};

module.exports = modelProducts;
