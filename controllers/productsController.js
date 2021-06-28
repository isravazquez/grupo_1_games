const fs = require('fs');
const path = require('path');

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
      let cadenaJsonA = fs.readFileSync(path.resolve(__dirname,'products.json'),'utf-8');
      //conversion de objeto a cadena json
      let listaProducts = JSON.parse(cadenaJsonA);


      // muestreo de datod principales 
      // console.log(req.body.id);
      // console.log(req.body.name);
      // console.log(req.body.category);
      // console.log(req.body.price);
      // console.log(req.body.discountRate);
      // console.log(req.body.stock);
      // console.log(req.body.features);
      // console.log(req.body.description);
      // console.log(req.body.image);
      // console.log(req.body.userWhoRegistered);
     
      //extras
      //console.log("-----")
      //descuento
      //console.log(`${((req.body.price-(req.body.discountRate/100)*req.body.price))}`); //total a pagar aplicando descuento 
      
      //hora 
      let fecha = new Date();
      //console.log(fecha.getHours()+":"+fecha.getMinutes()); //hora de registro del producto 12:32

      //fecha 
      const map = {
        dd: fecha.getDate(),
        mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
        yy: fecha.getFullYear().toString().slice(-2),
        yyyy: fecha.getFullYear()
      }

    

      //mensaje de confirmacion
      res.send('datos recibidos..').status(200);
      
      
      let productTmp = {
        id: parseInt(req.body.id),
        name: req.body.name,
        category: req.body.category,
        price: "$"+req.body.price,
        discountRate: parseInt(req.body.discountRate),
        discount: "$"+((req.body.price-(req.body.discountRate/100)*req.body.price)), //precio a pagar menos el descuento
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

      //conversion de objeto a cadena json
      let cadenaJsonE = JSON.stringify(listaProducts,null, 2);
      //escritura de archivo

      fs.writeFileSync(path.resolve(__dirname,'products.json'),cadenaJsonE); 

    }
  };
  
  module.exports = productsController;