window.addEventListener('load', function () {

    let listaProductosSeleccinados = localStorage.getItem('listaProductosSeleccinados');

    if(listaProductosSeleccinados == null){
        listaProductosSeleccinados = [];
    }else{
        listaProductosSeleccinados = JSON.parse(listaProductosSeleccinados);
    }


    let contenedorProductos = document.querySelector('div#tablaProductos');

    if(listaProductosSeleccinados.length != 0){
        console.log("arreglo con datos");

        // console.log(contenedorProductos)

        for (let i = 0; i < listaProductosSeleccinados.length; i++) {
            //creacion de etiqutas 

                //div principal
                const divProductos = document.createElement("div");
                divProductos.setAttribute("id", "productos");
                divProductos.setAttribute("class", "centrado");


                    const divImagen = document.createElement("div");
                    divImagen.setAttribute("id", "imagen");

                        const imagen = document.createElement("img");
                        imagen.setAttribute("src", listaProductosSeleccinados[i].imagen);
                        imagen.setAttribute("alt", "miniatura");
                        imagen.setAttribute("class", "miniatura");
                        divImagen.appendChild(imagen);

                        const nombre = document.createElement("p");
                        nombre.setAttribute("class", "nomProduct");
                        //nombre.setAttribute("style", "display: none");//para ocultar nombre 
                        nombre.textContent = listaProductosSeleccinados[i].nombre;
                        divImagen.appendChild(nombre);

                        const id = document.createElement("p");
                        id.setAttribute("id", "id"+i);
                        id.textContent = listaProductosSeleccinados[i].id;
                        // id.style.visibility = "hidden";
                        divImagen.appendChild(id);
                    
                    const divPrecio = document.createElement("div");
                    divPrecio.setAttribute("id", "precio");
                    divPrecio.setAttribute("class", "centrado");
                   

                        const precio = document.createElement("p");
                        precio.textContent = listaProductosSeleccinados[i].precio;
                        divPrecio.appendChild(precio);

                    const divCantidad = document.createElement("div");
                    divCantidad.setAttribute("id", "cantidad");
                    divCantidad.setAttribute("class", "centrado");


                        const divMenos = document.createElement("div");
                            const aMenos = document.createElement("a");
                            aMenos.setAttribute("id", "menos");
                                const strong1 = document.createElement("strong");
                                strong1.textContent = '-';
                                aMenos.appendChild(strong1);
                        divMenos.appendChild(aMenos);
                        divCantidad.appendChild(divMenos);


                        const numProduct = document.createElement("div");
                            const inputProduct = document.createElement("input");
                            inputProduct.setAttribute("type", "text");
                            inputProduct.setAttribute("id", "numProduct"+i);
                            inputProduct.setAttribute("class", "conteCant");
                            inputProduct.setAttribute("value", listaProductosSeleccinados[i].cantidad);
                            numProduct.appendChild(inputProduct);
                        divCantidad.appendChild(numProduct);

                        const divMas = document.createElement("div");
                            const aMas = document.createElement("a");
                            aMas.setAttribute("id", "mas");
                                const strong2 = document.createElement("strong");
                                strong2.textContent = '+';
                                aMas.appendChild(strong2);
                        divMas.appendChild(aMas);
                        divCantidad.appendChild(divMas);

                    const divTotal = document.createElement("div");
                    divTotal.setAttribute("id", "total");
                              
                        const total = document.createElement("p");
                        total.textContent = listaProductosSeleccinados[i].precio * 1;
                        divTotal.appendChild(total);
                    
                    
                    const divIcono = document.createElement("div");
                    divIcono.setAttribute("id", "icono");
                    divIcono.setAttribute("class", "centrado");
            
                        const imagenIcono = document.createElement("img");
                        imagenIcono.setAttribute("src", "/img/cancel_black_24dp.svg");
                        imagenIcono.setAttribute("alt", "icono");
                        divIcono.appendChild(imagenIcono);
                

                divProductos.appendChild(divImagen);
                divProductos.appendChild(divPrecio);
                divProductos.appendChild(divCantidad);
                divProductos.appendChild(divTotal);
                divProductos.appendChild(divIcono);
                
                
                //agregacion de etiquetas al contenedor 
                contenedorProductos.appendChild(divProductos);
                // contenedorProductos.appendChild(imagen );
            }




             /**-------------------------------para cantidad de productos----------------------------------  */
            
             const listaProductos = document.querySelectorAll('div#productos');
             //console.log(listaProductos);
             
             let subTotal = document.querySelector('strong#subtotal');
             // console.log(subTotal.innerText);
             let subTotalValor = 0.0; 
         
            
             for(let i = 0; i < listaProductos.length; i++) {
         
                //hacer la opereracion desde inicio 
                
             //    console.log();
                
                let precioP   = parseFloat(listaProductos[i].childNodes[1].childNodes[0].innerText);
             //    console.log("precio: "+precioP);
                let cantidadP = parseFloat(listaProductos[i].childNodes[2].childNodes[1].childNodes[0].value);
             //    console.log("cantidad: "+cantidadP)
                let totalP = precioP * cantidadP;
             //    console.log(totalP)
                listaProductos[i].childNodes[3].childNodes[0].innerText = totalP;
                 
              
         
               subTotalValor = subTotalValor + parseFloat(listaProductos[i].childNodes[3].childNodes[0].innerText);
         
               subTotal.innerText = subTotalValor;
         
         
                 // console.log(listaProductos[i]);//todo el elemento 
                 // console.log(listaProductos[i].childNodes[1].childNodes[0].innerText);//precio
                 // console.log(listaProductos[i].childNodes[3].childNodes[0].innerText);//total
                 // console.log(listaProductos[i].childNodes[2].childNodes[0].childNodes[0].childNodes[0]);//cantidad 
                 // console.log(listaProductos[i].childNodes[2].childNodes[2].childNodes[0].childNodes[0]); //mas 
                 // console.log( listaProductos[i].childNodes[2].childNodes[0].childNodes[0].childNodes[0]); //menos 
                 
                 
                 //boton de resta 
                 listaProductos[i].childNodes[2].childNodes[0].childNodes[0].childNodes[0].addEventListener('click',()=>{
                     // console.log('se dio clic en menos '+i);
         
                     let valorCantidad = document.querySelector("input#numProduct"+i);
                     // console.log(valorCantidad);
                     valorCantidad.value = parseInt(valorCantidad.value) - 1 ;
         
                     if(valorCantidad.value < 1){
                         valorCantidad.value = 0;//cantidad minima 
                     }
         
         
                     let precio = parseInt(listaProductos[i].childNodes[1].childNodes[0].innerText);
                     // console.log(precio);
                     let cantidad = parseFloat(listaProductos[i].childNodes[2].childNodes[1].childNodes[0].value);
                     //    console.log("cantidad: "+cantidadP)
                     let precioTotal =  parseFloat(listaProductos[i].childNodes[3].childNodes[0].innerText);
                     // console.log(precioTotal);
                     let totalP = precio * cantidad;
                     //    console.log(totalP)
                     listaProductos[i].childNodes[3].childNodes[0].innerText = totalP;
         

         
                     if(subTotalValor != 0 && precioTotal != 0){
                         subTotalValor = subTotalValor-precio;
                         subTotal.innerText = subTotalValor; 
         
                     }
         
               
                 })
         
         
         
                 //boton de suma
                 listaProductos[i].childNodes[2].childNodes[2].childNodes[0].childNodes[0].addEventListener('click',()=>{
                     // console.log('se dio clic en mas '+i);
         
                     let valorCantidad = document.querySelector("input#numProduct"+i);
                     // console.log(valorCantidad);
                     valorCantidad.value = parseInt(valorCantidad.value) + 1 ;
         
         
                     
                     let precio = parseInt(listaProductos[i].childNodes[1].childNodes[0].innerText);
                     // console.log(precio);
                     let cantidad = parseFloat(listaProductos[i].childNodes[2].childNodes[1].childNodes[0].value);
                     //    console.log("cantidad: "+cantidadP)
                     let totalP = precio * cantidad;
                     //    console.log(totalP)
                     listaProductos[i].childNodes[3].childNodes[0].innerText = totalP;
         
         
                     subTotalValor = subTotalValor+precio;
                     subTotal.innerText = subTotalValor; 
                 })


                 /**--------------------------------eliminacion producto de local storage----------------------- **/
                // console.log(listaProductos[i].childNodes[4]);
                listaProductos[i].childNodes[4].addEventListener('click',()=>{
                    // console.log("se dio clic al icono ");
                    // console.log(listaProductos[i].childNodes[0].childNodes[2]);
                    let id = listaProductos[i].childNodes[0].childNodes[2].innerText;
                    // console.log(id);
                 

                    let listaProductosSeleccinados = localStorage.getItem('listaProductosSeleccinados');

                    if(listaProductosSeleccinados == null){
                        listaProductosSeleccinados = [];
                    }else{
                        listaProductosSeleccinados = JSON.parse(listaProductosSeleccinados);
                    }

                    // for (let y = 0; y < listaProductosSeleccinados.length; y++) {
                    //     console.log(listaProductosSeleccinados[y]);
                    // }

                    // console.log("-----------------");

                    let indice = listaProductosSeleccinados.findIndex( (producto) => {
                        return producto.id == parseInt(id);
                    });

                    listaProductosSeleccinados.splice(indice , 1);


                    // for (let y = 0; y < listaProductosSeleccinados.length; y++) {
                    //    console.log(listaProductosSeleccinados[y]);
                    // }

                    localStorage.setItem('listaProductosSeleccinados', JSON.stringify(listaProductosSeleccinados));

                    
                    location.reload();

                })
                


                /**--------------------------------eliminacion producto de local storage----------------------- **/
         
                 
        }

    }else{
        console.log("arreglo vacio");


        const divProductos = document.createElement("div");

            const parrafo = document.createElement("p");
            parrafo.textContent = "No hay productos seleccionados";
            parrafo.style.textAlign = "center";
                divProductos.appendChild(parrafo);

  
        let subTotal = document.querySelector('strong#subtotal');
        subTotal.innerText = 0;


                
                
        //agregacion de etiquetas al contenedor 
        contenedorProductos.appendChild(divProductos);
 
 
    /**-------------------------------para cantidad de productos----------------------------------  */
    }


})