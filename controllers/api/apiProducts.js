const db = require('../../database/models');
// const {objetByDB} = require('../productsController');

const apiProducts = {
  test: (req, res) => {
     db.Category.findAll().then((categorias) => {
        // console.log(peliculas);
        return res.json(categorias);
     }).catch((error) => {
        console.log('Error de: '+ error);
    });
    
  },
  listCategories: async (req, res) => {
   
   const listCategories = await db.Category.findAll().catch((error) => {
      console.log('Error de: '+ error);
   });

   let respuesta = {
      meta: {
          status : 200,
          total: listCategories.length,
          url: 'api/categories'
      },
      data: listCategories
  }
    
  return res.json(respuesta);
 },
  listProducts: async (req, res) => {
   const listProducts = await db.Product.findAll({
         include:[{
            association: 'Image',
         }]
   }).catch((error) => {
      console.log('Error de: '+ error);
   });

   let respuesta = {
      meta: {
          status : 200,
          total: listProducts.length,
          url: 'api/products'
      },
      data: listProducts
   }


   return res.json(respuesta);

  },
  deteilProduct: async(req, res)=>{
      const Product = await db.Product.findByPk(req.params.id,
         {
            include:[{
               association: 'Image',
            }]
         })
         .catch((error) => {
            console.log('Error de: '+ error);
         });
      
         return res.json(Product);
  },
  createProduct: async(req, res) => {
         /** modelo para hacer post  con fetch
    {
  
        "name": "new",
        "category": 2,
        "price": 12000,
        "discountRate": 12,
        "discount": 10560,
        "stock": 12,
        "description": "sdsdasd",
        "features": "sdsdsds",
        "registrationDatetime": "2021-09-07",
        "userWhoRegistered": "Admin Root",
        "Image": [
            {
                "id": 121,
                "productId": 42,
                "name": "imagesProducto-1631044449796.webp"
            },
            {
                "id": 122,
                "productId": 42,
                "name": "imagesProducto-1631044449801.webp"
            },
            {
                "id": 123,
                "productId": 42,
                "name": "imagesProducto-1631044449802.webp"
            },
            {
                "id": 124,
                "productId": 42,
                "name": "imagesProducto-1631044449803.webp"
            },
            {
                "id": 125,
                "productId": 42,
                "name": "imagesProducto-1631044449806.webp"
            }
        ]
    }
    
     */



     const productTmp = apiProducts.objetByDB(req);
   //   console.log(productTmp);

     
      //creacion de registro en base de datos
      const product  = await db.Product.create(productTmp).catch((error) => {
        console.log('Error de: '+ error);
      });
      
      console.log(product);
      
      // creacion de registro de imagenes de cada producto      
      for (const imagen of productTmp.images) {
          console.log(imagen.name);
          await db.Image.create({
            name: imagen.name,
            productId: product.id,
          }).catch((error) => {
            console.log('Error de: '+ error);
          });
      }

  },
  updateProduct: async(req, res) => {
     /**modelo para hacer put con fetch
       {
        "id": 67,
        "name": "Maquinita Arcade Multijuegos Pacman 3288 Juegos New",
        "categoryId": 2,
        "price": 1200,
        "discountRate": 12,
        "discount": 1056,
        "stock": 32,
        "description": "sdsdsdsdsdsdsdsdassdvsfvfvfgfsgfsd",
        "features": "playera roja con estampado, detallee en amarillo, cueyo V",
        "registrationDatetime": "2021-10-05",
        "userWhoRegistered": "Eduardo  iquierdo rojas",
        "Image": [
            {
                "id": 143,
                "productId": 63,
                "name": "imagesProducto-1633449623436.webp"
            },
            {
                "id": 144,
                "productId": 63,
                "name": "imagesProducto-1633449623439.webp"
            },
            {
                "id": 145,
                "productId": 63,
                "name": "imagesProducto-1633449623536.webp"
            }
        ]
    }
      */



      const productTmp = apiProducts.objetByDB(req);
      // console.log(productTmp);

      //actualisar pruducto 
      await db.Product.update(productTmp, {
         where: {
             id : req.params.id
         }
      }).catch( error =>{
         console.log(error);
      });

      //eliminar las imagenes que se tenian antes tanto en carpeta fisica como en base de datos 
      //consulta a la base de datos para obtener el producto mediante su id
      let productE = await db.Product.findByPk(parseInt(req.params.id),{
             include:[{
                 association: 'Image'
                 // association: 'Category'
             }] 
      }).catch((error) => {
       console.log('Error de: '+ error);
     });

      
      
      //eliminanado imagenes en base de datos registradas al inicio 
      // console.log(productE);

      for(let i= 0 ; i< productE.Image.length ;i++){
         await db.Image.destroy({
            where :{
                name : productE.Image[i].name
            }
          }).catch((error) => {
            console.log('Error de: '+ error);
          });
      }


      // console.log(productTmp);

      // creacion de registro de las nuevas  imagenes entrantes de cada producto      
      for (const imagen of productTmp.images) {
          console.log(imagen.name);
          await db.Image.create({
            name: imagen.name,
            productId: req.params.id,
          }).catch((error) => {
            console.log('Error de: '+ error);
          });
      }

  },
  deleteProduct: async(req, res) => {

      //consulta a la base de datos para obtener el producto mediante su id
      const productE = await db.Product.findByPk(parseInt(req.params.id),{
               include:[{
                  association: 'Image'
                  // association: 'Category'
            }]
      }).catch((error) => {
         console.log('Error de: '+ error);
      });
      

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
      
      await db.Product.destroy({
         where: {id: req.params.id}, force: true
      }) 
      .catch((error) => {
               console.log('Error de: '+ error);
      });

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
             categoryId: parseInt(req.body.categoryId),
             price: parseInt(req.body.price),
             discountRate: parseInt(req.body.discountRate),
             discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
             stock: parseInt(req.body.stock),
             description: req.body.description,
             images: req.body.Image,    //para imagenes secundarias
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
 
 
     
    // console.log('yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]));
     const productoTmp = {
             name: req.body.name,
             categoryId:  parseInt(req.body.categoryId),
             price: parseInt(req.body.price),
             discountRate: parseInt(req.body.discountRate),
             discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
             stock: parseInt(req.body.stock),
             description: req.body.description,
             images: req.body.Image,    //para imagenes secundarias
             features: req.body.features,
             //extras fecha de registro, hora de registro y usuario que hio el registro 
             registrationDatetime: 'yy-mm-dd'.replace(/yy|mm|dd|yyy/gi, matched => map[matched]),
             // checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
             userWhoRegistered: req.body.userWhoRegistered
     };

     return productoTmp;
   },

}
module.exports = apiProducts;