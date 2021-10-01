const fs = require('fs').promises;
const path = require('path');

const {validationResult} = require('express-validator');

const db = require('../database/models');
// const sequelize = db.sequelize;

const productsController = {
  test: (req, res) => {
     db.Category.findAll().then((categorias) => {
        // console.log(peliculas);
        return res.json(categorias);
     }).catch((error) => {
        console.log('Error de: '+ error);
    });
    
  },
  viewCreateProduct: async (req, res) => {
  
    // consulta a la base de datos para obtener categorias 
     const categorias  = await db.Category.findAll().catch((error) => {
       console.log('Error de: '+ error);
     });

    //renderrisado de vista crear producto 
    res.status(200);
    res.render("createProduct",{ categoriasDB : categorias});

  },
  viewDetailProduct: async(req, res) => {

    //consulta a la base de datos para obtener el producto mediante su id
    const productE = await db.Product.findByPk(parseInt(req.params.id),{
            include:[{
                association: 'Image',
            }]
      }).catch((error) => {
       console.log('Error de: '+ error);
     });

    // console.log("-------->"+productE);

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
  createProduct: async (req, res) => {
    
    //validacion de errores desde backend
    const errores = validationResult(req);
    
    //validacion de si existen errores
    if(errores.isEmpty()){


      //crear objeto temporal
      const productTmp = productsController.objetByDB(req);

      // creacion de registro en base de datos
      const product  = await db.Product.create(productTmp).catch((error) => {
        console.log('Error de: '+ error);
      });
      
      // console.log(product.id);
      
      //arreglo de nombres de imagenes 
      const namesimagenes = productsController.imagesByDb(req);

      // creacion de registro de imagenes de cada producto      
      for (const nameIma of namesimagenes) {
          console.log(nameIma);
          await db.Image.create({
            name: nameIma,
            productId: product.id,
          }).catch((error) => {
            console.log('Error de: '+ error);
          });
      }
     
      //consulta a la base de datos para obtener productos 
      const listProducts = await db.Product.findAll({
            include:[{
                association: 'Image',
            }]
      }).catch((error) => {
        console.log('Error de: '+ error);
      });
      
      //retorno a crear otro producto
      res.status(200); 
      res.render('listProducts', { products: listProducts});

    }else{
      console.log(errores);
      //retorno a base de datss si existen errores 

      const categorias = await db.Category.findAll().catch((error) => {
        console.log('Error de: '+ error);
      });

      
      res.render('createProduct', { msgsErrors : errores.mapped(), DataOld  : req.body,  categoriasDB : categorias } );// otra forma de hacerlo 
    }  
    
  },
  listProducts: async (req, res) => {
    //consulta a la base de datos para obtener productos 
    const listProducts = await db.Product.findAll({
            include:[{
                association: 'Image',
            }]
    }).catch((error) => {
      console.log('Error de: '+ error);
    });
      

    //envio de datos a vista
    res.status(200); 
    res.render('listProducts', { products: listProducts});

  },
  editProduct: async (req, res)=>{

    //consulta a la base de datos para obtener el producto mediante su id
    const productE = await db.Product.findByPk(parseInt(req.params.id),{
            include:[{
                association: 'Image',
                association: 'Category'
            }]
      }).catch((error) => {
       console.log('Error de: '+ error);
    });

    // console.log(productE);

    const categorias = await db.Category.findAll().catch((error) => {
        console.log('Error de: '+ error);
    });
    

    //verificacion de no estar vacio 
    if(productE != null){
      //si exiten errores de validacion se envian 
      res.status(200);
      res.render('editProduct', { product: productE,  categoriasDB : categorias});
    }else{
      res.status(404);
      res.render("not-found");
    }  
  },
  updateProduct:async (req, res)=>{

    const errores = validationResult(req);
      
    //validacion de si existen errores
    if(errores.isEmpty()){
      
       
        //crear objeto temporal
        const productTmp = await productsController.objetByDBPut(req);
        console.log(productTmp);


        // console.log(productM);

        await db.Product.update(productTmp, {
            where: {
                id : req.params.id
            }
        }).catch( error =>{
            console.log(error);
        });


        //eliminar las imagenes que se tenian antes tanto en carpeta fisica como en base de datos 
        //consulta a la base de datos para obtener el producto mediante su id
        const productE = await db.Product.findByPk(parseInt(req.params.id),{
                include:[{
                    association: 'Image'
                    // association: 'Category'
                }]
        }).catch((error) => {
        console.log('Error de: '+ error);
        });

        //elimiando imagenes de producto en carpeta para guardar las nuevas y no almecenar las primera cargadas al crear el producto 
        for(let i= 0 ; i< productE.Image.length ;i++){
          console.log(productE.Image[i].name);
          productsController.eliminarArchivoImagen(productE.Image[i].name);
        }

        //eliminanado imagenes en base de datos 
        for(let i= 0 ; i< productE.Image.length ;i++){
          await db.Image.destroy({
            where :{
                name : productE.Image[i].name
            }
          }).catch((error) => {
            console.log('Error de: '+ error);
          });
        }

        //ahora insertamos las nuevas imagenes que vienen del formulario de actulisacion 
        //arreglo de nombres de imagenes 
        const namesimagenes = productsController.imagesByDb(req);

        // creacion de registro de imagenes de cada producto      
        for (const nameIma of namesimagenes) {
            console.log(nameIma);
            await db.Image.create({
              name: nameIma,
              productId: req.params.id,
            }).catch((error) => {
              console.log('Error de: '+ error);
            });
        }


        //consulta a la base de datos para obtener productos 
        const listProducts = await db.Product.findAll({
              include:[{
                  association: 'Image',
              }]
        }).catch((error) => {
          console.log('Error de: '+ error);
        });
        
        //retorno a crear otro producto
        res.status(200); 
        res.render('listProducts', { products: listProducts});

 
    }else{

      const categorias = await db.Category.findAll().catch((error) => {
        console.log('Error de: '+ error);
      });
    
      console.log(req.body);
      res.render('editProduct', { msgsErrors : errores.mapped(), DataOld  : req.body,  categoriasDB : categorias} );// otra forma de hacerlo 
    }

  },
  deleteProduct: async (req, res)=>{

      //consulta a la base de datos para obtener el producto mediante su id
       const productE = await db.Product.findByPk(parseInt(req.params.id),{
              include:[{
                  association: 'Image'
                  // association: 'Category'
              }]
      }).catch((error) => {
      console.log('Error de: '+ error);
      });

      //elimiando imagenes de producto en carpeta 
      for(let i= 0 ; i< productE.Image.length ;i++){
        console.log(productE.Image[i].name);
        productsController.eliminarArchivoImagen(productE.Image[i].name);
      }

      //eliminanado imagenes en base de datos primeramente para hacer una eliminacion en cascada de las imagenes del producto 
      //y no se tenga problema por la foregin key
      for(let i= 0 ; i< productE.Image.length ;i++){
        await db.Image.destroy({
          where :{
              name : productE.Image[i].name
          }
        }).catch((error) => {
          console.log('Error de: '+ error);
        });
      }

      //aliminacion de producto de la base de datos 
      await db.Product.destroy({
        where :{
            id : req.params.id
        }
      }).catch((error) => {
        console.log('Error de: '+ error);
      });


      //consulta a la base de datos para obtener productos 
      const listProducts = await db.Product.findAll({
            include:[{
                association: 'Image',
            }]
      }).catch((error) => {
        console.log('Error de: '+ error);
      });

      
      //redireccion a editar productos
      res.status(200);
      res.render('listProducts', {  products : listProducts} );          
      
    
  },
  objetByDB: function (req) {
    //objeto para fechas 
    const fecha = new Date();

    //para obtener la fecha con formato 
    const map = {
         dd: fecha.getDate(),
         mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
         yy: fecha.getFullYear().toString(),
         yyyy: fecha.getFullYear()
    }


   
    // console.log('yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]));
     const productoTmp = {
             name: req.body.name,
             categoryId: req.body.category,
             price: parseInt(req.body.price),
             discountRate: parseInt(req.body.discountRate),
             discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
             stock: parseInt(req.body.stock),
             description: req.body.description,
             // image: imagenes[0],     //para imagen principal 
             // imagesSec: imagenes,    //para imagenes secundarias
             features: req.body.features,
             //extras fecha de registro, hora de registro y usuario que hio el registro 
             registrationDatetime: 'yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]),
             // checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
             userWhoRegistered: req.body.userWhoRegistered
     };

     return productoTmp;


 },
 objetByDBPut: async function (req) {
    //objeto para fechas 
    const fecha = new Date();

    //para obtener la fecha con formato 
    const map = {
         dd: fecha.getDate(),
         mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
         yy: fecha.getFullYear().toString(),
         yyyy: fecha.getFullYear()
    }

     const categoriaE = await db.Category.findAll({
         where: {
             name: req.body.category.trim()
         }
     }).catch((error) => {
       console.log('Error de: '+ error);
     });

     // console.log(categoriaE);
     // console.log(categoriaE[0].id);
     
    // console.log('yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]));
     const productoTmp = {
             name: req.body.name,
             categoryId: categoriaE[0].id,
             price: parseInt(req.body.price),
             discountRate: parseInt(req.body.discountRate),
             discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
             stock: parseInt(req.body.stock),
             description: req.body.description,
             // image: imagenes[0],     //para imagen principal 
             // imagesSec: imagenes,    //para imagenes secundarias
             features: req.body.features,
             //extras fecha de registro, hora de registro y usuario que hio el registro 
             registrationDatetime: 'yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]),
             // checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
             userWhoRegistered: req.body.userWhoRegistered
     };

     return productoTmp;


 },
 imagesByDb:function (req) {
     //para validar se han cargado imagenes desde el formulario
     const imagenes = [];
     // req.files.imageProducto[0].filename
     if(req.files){
         //imagenes 
         // console.log(req.files);
         
         req.files.forEach( imagen => {
             // console.log(imagen);
             imagenes.push(imagen.filename);
         });

     }else{
         imagenes = [];
     }

     //console.log(imagenes);
     return imagenes;
  },
  eliminarArchivoImagen: function (nombreImagen) {

    const rutaImagen = path.join(__dirname,'../public/img/imagesProducts/'+nombreImagen);

     //console.log(rutaImagen);
     fs.unlink(rutaImagen).then( ()=>{
        console.log('Se elimino archivo de imagen... al actuliar datos');
     }).catch( err =>{
        console.error('No se pudo eliminar el archivo no exite',err);
     });

  },
  tablerosIndex: (req, res) => {
    res.render("./categoryIndex/tablerosIndex");
  },
  maquinitasIndex: (req, res) => {
    res.render("./categoryIndex/maquinitasIndex");
  },
  futbolitosIndex: (req, res) => {
    res.render("./categoryIndex/futbolitosIndex");
  },
  accesoriosIndex: (req, res) => {
    res.render("./categoryIndex/accesoriosIndex");
  },

}

  
module.exports = productsController;