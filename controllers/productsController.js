const fs = require('fs');
const path = require('path');
const modelProducts = require('../models/modelProducts');

const productsController = {
    viewCreateProduct: (req, res) => {
      res.render("createProduct");
    },
    viewDetailProduct: (req, res) => {
      res.render("productDetail");
    },
    viewShoppingCart: (req, res) => {
      res.render("shoppingCart");
    },
    createProduct: (req, res) => {

      //apertura de archivo
      let listaProducts = modelProducts.aperturaDeArchivo();
      

      //objeto hora 
      let fecha = new Date();
 
      //fecha 
      const map = {
        dd: fecha.getDate(),
        mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
        yy: fecha.getFullYear().toString().slice(-2),
        yyyy: fecha.getFullYear()
      }

      let productTmp = {
        id: parseInt(req.body.id),
        name: req.body.name,
        category: req.body.category,
        price: parseInt(req.body.price),
        discountRate: parseInt(req.body.discountRate),
        discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
        stock: parseInt(req.body.stock),
        description: req.body.description,
        image: req.body.image,
        features: req.body.features,
        //extras
        registrationDate: 'dd/mm/yy'.replace(/dd|mm|yy|yyy/gi, matched => map[matched]),
        checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
        userWhoRegistered: req.body.userWhoRegistered,
      }; 

      //objeto a insertar en archivo o base de datos 
      listaProducts.push(productTmp);
      console.log(productTmp);

      //escritura de archivo
      modelProducts.escrituraDeArchivo(listaProducts);
     

      res.redirect('createProduct');
    },
    listProducts: (req, res) => {
      //apertura de archivo
      let listaProducts = modelProducts.aperturaDeArchivo();
      

      //envio de datos a vista 
      res.render('listProducts', { products: listaProducts});
    },
    editProduct:(req, res)=>{
      //apertura de archivo
      let listaProducts = modelProducts.aperturaDeArchivo();
      

      let productoEncontrado = listaProducts.find( (producto) => {
        return producto.id == parseInt(req.params.id);
      });

      console.log(productoEncontrado.price);
      if(productoEncontrado != null){
        res.render('editProduct', { product: productoEncontrado});
      }else{
        res.send("producto no encontrado...");
      }

    },
    updateProduct:(req, res)=>{
      //apertura de archivo
      let listaProducts = modelProducts.aperturaDeArchivo();
      

      let productoEncontrado = listaProducts.find( (producto) => {
        return producto.id == parseInt(req.params.id);
      });

      if(productoEncontrado != null){

        console.log(productoEncontrado);
        
        let fecha = new Date();
      
        //fecha 
        const map = {
          dd: fecha.getDate(),
          mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
          yy: fecha.getFullYear().toString().slice(-2),
          yyyy: fecha.getFullYear()
        }

        let productTmp = {
          id: parseInt(req.body.id),
          name: req.body.name,
          category: req.body.category,
          price: parseInt(req.body.price),
          discountRate: parseInt(req.body.discountRate),
          discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
          stock: parseInt(req.body.stock),
          description: req.body.description,
          image: req.body.image,
          features: req.body.features,
          //extras
          registrationDate: 'dd/mm/yy'.replace(/dd|mm|yy|yyy/gi, matched => map[matched]),
          checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
          userWhoRegistered: req.body.userWhoRegistered,
        }; 

        let productoModificado={};
        productoModificado = Object.assign(productoModificado, productoEncontrado, productTmp);

        let indice = listaProducts.findIndex( (producto) => {
              return producto.id == parseInt(req.params.id);
        });

        listaProducts[indice] = productoModificado;


        modelProducts.escrituraDeArchivo(listaProducts);

        //reenvio de lista actualiada
        listaProducts = modelProducts.aperturaDeArchivo();
        
        //redireccion a editar productos
        res.render('listProducts', {products : listaProducts} );

      }else{
        res.send("producto no encontrado...");
      }

    }
    ,deleteProduct:(req, res)=>{

        //apertura de archivo
        let listaProducts = modelProducts.aperturaDeArchivo();
      

        // buscauada de indice
        let indice = listaProducts.findIndex( (producto) => {
            return producto.id == parseInt(req.params.id);
        });

        if(indice != -1){

          //eliminacion del producto de la lista 
          listaProducts.splice(indice, 1);


          //reescritura y envio de lista actulisada

          //escritura de archivo
          modelProducts.escrituraDeArchivo(listaProducts);
          listaProducts = modelProducts.aperturaDeArchivo();
        
          //redireccion a editar productos
          res.render('listProducts', {products : listaProducts} );

        }else{
          res.send("producto no encontrado...");
        } 
    }
}
  
module.exports = productsController;