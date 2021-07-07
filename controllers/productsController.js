const modelProducts = require('../models/modelProducts');

const productsController = {
    viewCreateProduct: (req, res) => {
      res.status(200);
      res.render("createProduct");
    },
    viewDetailProduct: (req, res) => {
      //apertura de archivo
      let listProducts = modelProducts.aperturaDeArchivo();
      
      //busqueda de producto
      let productE = modelProducts.buscarProducto(listProducts, req);

      //verificacion de no estar vacio 
      if(productE != null){
        res.status(200);
        res.render("productDetail", { product : productE});
      }else{
        res.status(404);
        res.render("not-found");
      }

    },
    viewShoppingCart: (req, res) => {
      res.status(200);
      res.render("shoppingCart");
    },
    createProduct: (req, res) => {

        //apertura de archivo
        let listProducts = modelProducts.aperturaDeArchivo();

        //creacion de objeto temporal 
        let productTmp = modelProducts.estructurarObjetoPOST(req);
        
        //objeto a insertar en archivo o base de datos 
        listProducts.push(productTmp);
          
        //escritura de archivo
        modelProducts.escrituraDeArchivo(listProducts);

        //retorno a crear otro producto
        res.status(200);
        res.redirect('listProducts');
    },
    listProducts: (req, res) => {

      //apertura de archivo
      let listProducts = modelProducts.aperturaDeArchivo();

      //envio de datos a vista
      res.status(200); 
      res.render('listProducts', { products: listProducts});

    },
    editProduct:(req, res)=>{
      
      //apertura de archivo
      let listProducts = modelProducts.aperturaDeArchivo();

      //busqueda de producto
      let productE =  modelProducts.buscarProducto(listProducts, req);

      //verificacion de no estar vacio 
      if(productE != null){
        //si exiten errores de validacion se envian 
        res.status(200);
        res.render('editProduct', { product: productE  });
      }else{
        res.status(404);
        res.render("not-found");
      }

    },
    updateProduct:(req, res)=>{


      //apertura de archivo
      let listProducts = modelProducts.aperturaDeArchivo();

      //busqueda de producto
      let productE = modelProducts.buscarProducto(listProducts, req);

      if(productE != null){

        //crear objeto temporal
        let productTmp = modelProducts.estructurarObjetoPUT(req, productE.image);

        let productM={};
        productM = Object.assign(productM, productE, productTmp);

        //buscar indice
        let indice = modelProducts.buscarIndice(listProducts, req);

        listProducts[indice] = productM;

        //escritura de archivo
        modelProducts.escrituraDeArchivo(listProducts);

        //apertura de archivo
        listProducts = modelProducts.aperturaDeArchivo();
        

        //redireccion a editar productos
        res.status(200);
        res.render('listProducts', {products : listProducts } );

      }else{
        res.status(404);
        res.render("not-found");
      }

    }
    ,deleteProduct:(req, res)=>{

       //apertura de archivo
       let listProducts = modelProducts.aperturaDeArchivo();

       // buscauada de indice
       let indice = modelProducts.buscarIndice(listProducts, req);

       if(indice != -1){

         //eliminacion de imagen previamente cargada y no exista despues de ser eliminada
         modelProducts.eliminarArchivoImagen(listProducts[indice].image);

         //eliminacion del producto de la lista 
         listProducts.splice(indice, 1);

         //escritura de archivo
         modelProducts.escrituraDeArchivo(listProducts);
         
         //redireccion a editar productos
         res.status(200);
         res.render('listProducts', {  products : listProducts} );          
         
       }else{
         res.status(404);
         res.render("not-found");
       } 
    }
}
  
module.exports = productsController;