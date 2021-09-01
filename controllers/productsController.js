const modelProducts = require('../models/modelProducts');
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
      const productTmp = modelProducts.objetByDB(req);

      // creacion de registro en base de datos
      const product  = await db.Product.create(productTmp).catch((error) => {
        console.log('Error de: '+ error);
      });
      
      // console.log(product.id);
      
      //arreglo de nombres de imagenes 
      const namesimagenes = modelProducts.imagesByDb(req);

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
        const productTmp = await modelProducts.objetByDBPut(req);
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
          modelProducts.eliminarArchivoImagen(productE.Image[i].name);
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
        const namesimagenes = modelProducts.imagesByDb(req);

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
        modelProducts.eliminarArchivoImagen(productE.Image[i].name);
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