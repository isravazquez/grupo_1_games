const fs = require('fs');
//para aliminar archivos
const fs2 = require('fs').promises;
const path = require('path');

let modelProducts = {
    
     
    aperturaDeArchivo: function () {
        //apertura de archivo
        let cadenaJsonA = fs.readFileSync(path.resolve(__dirname,'../data/products.json'),'utf-8');
        //conversion de objeto a cadena json
        let listaProductos = JSON.parse(cadenaJsonA);

        return listaProductos;
    },
    escrituraDeArchivo: function (listaProducts) {
        //conversion de objeto a cadena json
        let cadenaJsonE = JSON.stringify(listaProducts,null, 2);
        //escritura de archivo
        fs.writeFileSync(path.resolve(__dirname,'products.json'),cadenaJsonE); 
        
    },
    estructurarObjetoPOST: function (req) {
        
       //objeto para fechas 
       let fecha = new Date();

       //para obtener la fecha con formato 
       const map = {
            dd: fecha.getDate(),
            mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
            yy: fecha.getFullYear().toString().slice(-2),
            yyyy: fecha.getFullYear()
       }

        
    // ---------validacion de imagenes---------------
        
        //para validar se han cargado imagenes desde el formulario
        let imagenes = [];
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
        let productoTmp = {
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
        
        let fecha = new Date();
 
        //para obtener la fecha con formato 
        const map = {
             dd: fecha.getDate(),
             mm:  fecha.getMonth()+1 <= 9 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1),     //podriamos arreglar que agregue un cero en el mes
             yy: fecha.getFullYear().toString().slice(-2),
             yyyy: fecha.getFullYear()
        }
 
        
             //para validar que exite una imagen desde el formulario y se va actuliar
             let nombreImagen = '';
             
             
        // ---------validacion de imagenes---------------
        
            //para validar se han cargado imagenes desde el formulario
            let imagenes = [];
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
        let productoTmp = {
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
        let productoEncontrado = listaProductos.find( (producto) => {
            return producto.id == parseInt(req.params.id);
        });

        return productoEncontrado;
    },
    buscarIndice: function (listaProductos, req) {
        let indice = listaProductos.findIndex( (producto) => {
            return producto.id == parseInt(req.params.id);
        });

        return indice;
     },
    eliminarArchivoImagen: function (nombreImagen) {

        let rutaImagen = path.join(__dirname,'../public/img/imagesProducts/'+nombreImagen);

         //console.log(rutaImagen);
         fs2.unlink(rutaImagen).then( ()=>{
            console.log('Se elimino archivo de imagen... al actuliar datos');
         }).catch( err =>{
            console.error('No se pudo eliminar el archivo no exite',err);
         });
 
    }
};

module.exports = modelProducts;