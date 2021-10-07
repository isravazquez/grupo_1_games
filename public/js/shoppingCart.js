window.addEventListener('load', function () {

    let listaProductosSeleccinados = localStorage.getItem('listaProductosSeleccinados');

    if(listaProductosSeleccinados == null){
        listaProductosSeleccinados = [];
    }else{
        listaProductosSeleccinados = JSON.parse(listaProductosSeleccinados);
    }


    let contenedorProductos = document.querySelector('div#tablaProductos');
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
                nombre.textContent = listaProductosSeleccinados[i].nombre;
                divImagen.appendChild(nombre);
            
            
            const divPrecio = document.createElement("div");
            divPrecio.setAttribute("id", "precio");
            divPrecio.setAttribute("class", "centrado");
           

                const precio = document.createElement("p");
                precio.textContent = '$ '+ listaProductosSeleccinados[i].precio;
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
                    inputProduct.setAttribute("id", "numProduct");
                    inputProduct.setAttribute("value", listaProductosSeleccinados[i].cantidad);
                    numProduct.appendChild(inputProduct);
                divCantidad.appendChild(numProduct);

                const divMas = document.createElement("div");
                    const aMas = document.createElement("a");
                    aMas.setAttribute("id", "menos");
                        const strong2 = document.createElement("strong");
                        strong2.textContent = '+';
                        aMas.appendChild(strong2);
                divMas.appendChild(aMas);
                divCantidad.appendChild(divMas);

            const divTotal = document.createElement("div");
            divTotal.setAttribute("id", "total");
                      
                const total = document.createElement("p");
                total.textContent = '$ '+ listaProductosSeleccinados[i].precio * 1;
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

    // const listaProductos = document.querySelectorAll('div#productos');
    // console.log(listaProductos);

   
    // for (let i = 0; i < listaProductos.length; i++) {
    //         //  console.log(listaProductos[i].childNodes.length);
    //     for (let x = 0; x < listaProductos[i].childNodes.length; x++) {
    //         console.log(listaProductos[i].childNodes[2]);
    //     }
    // }


    //  let mas = document.querySelector('a#mas');

    //  mas.addEventListener('click', function () {
    //      // console.log('dio en mas ');
    //      let numProductcantidad = document.querySelector('input#numProduct');
    //      // console.log(numProductcantidad.value);
    //      numProductcantidad.value = parseInt(numProductcantidad.value) + 1 ;

    //  });


    //  let menos = document.querySelector('a#menos');

    //  menos.addEventListener('click', function () {
    //      // console.log('dio en menos ');
    //      let numProductcantidad = document.querySelector('input#numProduct');
    //      numProductcantidad.value = parseInt(numProductcantidad.value) - 1 ;

    //      if(numProductcantidad.value < 1){
    //          numProductcantidad.value = 1;
    //      }
    //  });
   /**-------------------------------para cantidad de productos----------------------------------  */



})