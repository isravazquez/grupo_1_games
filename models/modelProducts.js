const fs = require('fs');
//para aliminar archivos
const fs2 = require('fs').promises;
const path = require('path');

const db = require('../database/models');
const sequelize = db.sequelize;

const modelProducts = {
    
    aperturaDeArchivo: function () {
        //apertura de archivo
        const cadenaJsonA = fs.readFileSync(path.resolve(__dirname,'../data/products.json'),'utf-8');
        //conversion de objeto a cadena json
        const listaProductos = JSON.parse(cadenaJsonA);

        return listaProductos;
    },
    escrituraDeArchivo: function (listaProducts) {
        //conversion de objeto a cadena json
        const cadenaJsonE = JSON.stringify(listaProducts,null, 2);
        //escritura de archivo
        fs.writeFileSync(path.resolve(__dirname,'../data/products.json'),cadenaJsonE); 
        
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
    estructurarObjetoPOST: function (req) {
        
       //objeto para fechas 
       const fecha = new Date();

       //para obtener la fecha con formato 
       const map = {
            dd: fecha.getDate(),
            mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
            yy: fecha.getFullYear().toString().slice(-2),
            yyyy: fecha.getFullYear()
       }

        
    // ---------validacion de imagenes---------------
        
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
        // ---------validacion de imagenes---------------

        
        //creacion de objeto temporal que almacena los datos entrantes de la vista crear producto
        const productoTmp = {
            id: parseInt(Math.random() * (10000 - 1) + 1),
            name: req.body.name,
            category: req.body.category,
            price: parseInt(req.body.price),
            discountRate: parseInt(req.body.discountRate),
            discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
            stock: parseInt(req.body.stock),
            description: req.body.description,
            image: imagenes[0],     //para imagen principal 
            imagesSec: imagenes,    //para imagenes secundarias
            features: req.body.features,
            //extras fecha de registro, hora de registro y usuario que hio el registro 
            registrationDate: 'dd/mm/yy'.replace(/dd|mm|yy|yyy/gi, matched => map[matched]),
            checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
            userWhoRegistered: req.body.userWhoRegistered,
        }; 


        return productoTmp;
    },
    estructurarObjetoPUT: function (req, vectorImagenes) {
        
        const fecha = new Date();
 
        //para obtener la fecha con formato 
        const map = {
             dd: fecha.getDate(),
             mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
             yy: fecha.getFullYear().toString().slice(-2),
             yyyy: fecha.getFullYear()
        }
 
        
        //para validar que exite una imagen desde el formulario y se va actuliar
        // let nombreImagen = '';
             
             
        // ---------validacion de imagenes---------------
        
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

                //aliminacion de imagenes  creadas por primera ves que se encuentran en carpeta, para no acumular repetidas
                vectorImagenes.forEach(nombreImagen => {
                    this.eliminarArchivoImagen(nombreImagen);
                });

            }else{
                imagenes = [];
            }

            //console.log(imagenes);
        // ---------validacion de imagenes---------------
 
         
        //creacion de objeto temporal que almacena los datos entrantes de la vista crear producto
        const productoTmp = {
            id: parseInt(Math.random() * (10000 - 1) + 1),
            name: req.body.name,
            category: req.body.category,
            price: parseInt(req.body.price),
            discountRate: parseInt(req.body.discountRate),
            discount: parseInt(((req.body.price-(req.body.discountRate/100)*req.body.price))), //precio a pagar menos el descuento
            stock: parseInt(req.body.stock),
            description: req.body.description,
            image: imagenes[0],     //para imagen principal 
            imagesSec: imagenes,    //para imagenes secundarias
            features: req.body.features,
            //extras fecha de registro, hora de registro y usuario que hio el registro 
            registrationDate: 'dd/mm/yy'.replace(/dd|mm|yy|yyy/gi, matched => map[matched]),
            checkInTime: fecha.getHours()+":"+fecha.getMinutes()+" "+(fecha.getHours() >= 12 ? 'PM' : 'AM'),
            userWhoRegistered: req.body.userWhoRegistered,
        };
 
 
         return productoTmp;
    },
    buscarProducto: function (listaProductos, req) {
        const productoEncontrado = listaProductos.find( (producto) => {
            return producto.id == parseInt(req.params.id);
        });

        return productoEncontrado;
    },
    buscarIndice: function (listaProductos, req) {
        const indice = listaProductos.findIndex( (producto) => {
            return producto.id == parseInt(req.params.id);
        });

        return indice;
     },
    eliminarArchivoImagen: function (nombreImagen) {

        const rutaImagen = path.join(__dirname,'../public/img/imagesProducts/'+nombreImagen);

         //console.log(rutaImagen);
         fs2.unlink(rutaImagen).then( ()=>{
            console.log('Se elimino archivo de imagen... al actuliar datos');
         }).catch( err =>{
            console.error('No se pudo eliminar el archivo no exite',err);
         });
 
    }
};

module.exports = modelProducts;