
window.addEventListener('load', function (e) {

            console.log('hola desde script ');

            // const formulario =  document.querySelector('form#formulario');
            const botonCrear =  document.querySelector('input#botonCrearP');
            
                        
        
            // // desarrolla tu codigo aca 
            botonCrear.addEventListener('click', function (event) {

                

                // captura de inputs del DOM
                const name = document.querySelector('input#nameP');
                const category = document.querySelector('select#SelectOp').selectedIndex;
                const price = document.querySelector('input#price');
                const discountRate = document.querySelector('input#discountRate');
                const stock = document.querySelector('input#stock');
                const features = document.querySelector('input#features');
                const description = document.querySelector('textarea#descrip');
                const imagesProducto = document.querySelector('input#imagesProducto');
                // captura de secciones para errores  en el  DOM
                const errorName  = document.querySelector('p#errorName');
                const errorCategory  = document.querySelector('p#errorCategory');
                const errorPrice  = document.querySelector('p#errorPrice');
                const errorDiscountRate  = document.querySelector('p#errorDiscountRate');
                const errorStock = document.querySelector('p#errorStock');   
                const errorFeatures = document.querySelector('p#errorFeatures'); 
                const errorDescription = document.querySelector('p#errorDescription');                                    
                const errorImagesProducto = document.querySelector('p#errorImagesProducto');

                //objeto que almacena los errores 
                let errores = {};

                //validacion de cada uno de los inputs
      
                if(name.value.length < 1){
                    errores.name = 'El campo nombre no debe estar vacio'
                }else{
                    if(name.value.length < 5){
                        errores.name = 'El campo nombre debe al menos tener 5 caracteres'
                    }
                }
                
                if(category == 0){
                    errores.category = 'El campo categoria no debe estar vacio'
                }

                if(price.value.length < 1){
                    errores.price = 'El campo precio no debe estar vacio'
                }

                if(discountRate.value.length < 1){
                    errores.discountRate = 'El campo de descuento no debe estar vacio'
                }

                if(stock.value.length < 1){
                    errores.stock = 'El campo existencias no debe estar vacio'
                }

                if(features.value.length < 1){
                    errores.features = 'El campo de caracteristicas no debe estar vacio'
                }

                if(description.value.length < 1){
                    errores.description = 'El campo de descripcion no debe estar vacio'
                }else{
                    if(description.value.length < 20){
                        errores.description = 'El campo nombre debe al menos tener 20 caracteres'
                    }
                }

                if(imagesProducto.files.length == 0){

                    errores.imagesProducto = 'No debes dejar vacio el campo de imagenes...'
                  
                }else if( imagesProducto.files.length < 3 ){
      
                    errores.imagesProducto = 'Recuerda debes almenos cargar 3 imagenes...'
               
                }else if(imagesProducto.files.length > 5){
                    
                    errores.imagesProducto = 'Solo puedes cargar maximo 5 imagenes...'
                }else{

                    //validacion especifica para campo imagen 
                    let bandera = false;
                    let extencionesAceptadas = ['.jpg', '.png', '.webp','.gif'];

                    for (let i = 0; i < imagesProducto.files.length; i++) {

                        //verficaion de extencion 
                        let extencion = imagesProducto.files[i].name.split('.');
                    
                        let ext = '.'+extencion[1];
                     
                        if(!extencionesAceptadas.includes(ext)){
                       
                            bandera = false;
                        }else{
                            bandera = true;
                        }
                    };

                    //si alguna de las extenciones de los archivos no cumple con ser '.jpg', '.png', '.webp','.gif'
                    if(bandera == false){
                  
                        errores.imagesProducto = 'Alguno de los archivos cargados no cumple con las extenciones permitidas que son: .jpg, .png , .webp , .gif '
                
                    }


                }
                

                //retornamos los errores a la vista 
                if(Object.keys(errores).length >= 1){
                    
                    errorName.innerText = (errores.name) ? errores.name : '';
                    errorCategory.innerText = (errores.category) ? errores.category : '';
                    errorPrice.innerText = (errores.price) ? errores.price : '';
                    errorDiscountRate.innerText = (errores.discountRate) ? errores.discountRate : '';
                    errorStock.innerText = (errores.stock) ? errores.stock : '';
                    errorFeatures.innerText = (errores.features) ?  errores.features : '';
                    errorDescription.innerText = (errores.description) ?  errores.description : '';
                    errorImagesProducto.innerText = (errores.imagesProducto) ? errores.imagesProducto : '';
                    
                    event.preventDefault();
                }
            


            });

     
                                
});