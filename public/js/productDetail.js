window.addEventListener('load', function () {

    //obtenemos todos los enlaces
    let enlaces = document.querySelectorAll('a.enlaceIma');

    //para control de flechas en galeria de imagenes 
    const imagenes = [];
    let contador = 0 ;

    //recorremos todos los enlaces para aplicar un evento a cada uno 
    for (let i = 0; i < enlaces.length; i++) {
        
        //guardamos las rutas de todas las imagenes de los enlaces existenes 
        imagenes .push(enlaces[i].childNodes[1].currentSrc);
        
        //aplicamos un evento para dectar el paso del mouse por el enlace 
        enlaces[i].addEventListener('mouseover', function () {

            //cambiamos la ruta de la imagen que queremos mostrar en el apartado de imagen principal 
	    	let imaPrin = document.querySelector('#imaPrin');
	    	imaPrin.src = enlaces[i].childNodes[1].currentSrc;

            //al pasar por el enlace aplicamos un estilo para identificar que imagen a sido seleccionado 
            let enlace = document.querySelector("a#enlace"+(i+1));
            // console.log(enlace);
            enlace.style.border = "thick solid #EF0000";
	
	    });

         //aplicamos un evento para dectar cuando sale del enlace 
        enlaces[i].addEventListener('mouseout', function () {
            //aplicamos un estilo de borde 
            let enlace = document.querySelector("a#enlace"+(i+1));
            // console.log(enlace);
            enlace.style.border = "solid 1px black";
        });
    }

    //deteccion de clic en flechas de derecha e iquierda 

      //movimiento hacia atras de imagen 
      let max = imagenes.length;

      let fechaI = document.querySelector('a#left');
      fechaI.addEventListener('click', function () {
        //   console.log("se dio clic en flecha I");
          let imaPrin = document.querySelector('#imaPrin');
          contador--;
          if(contador < 0){
              contador = max-1;
          }
          imaPrin.src = imagenes[contador];
  
      
  
      });
  
      //movimiento hacia delante de imagenes 
      let min = 0;
  
      let fechaD = document.querySelector('a#rigth');
      
      fechaD.addEventListener('click', function () {
        //   console.log("se dio clic en flecha D");
          let imaPrin = document.querySelector('#imaPrin');
          contador++;
          if(contador > imagenes.length-1){
              contador = min;
          }
          imaPrin.src = imagenes[contador];
      });
      
      
    /**-------------------------------para cantidad de productos----------------------------------  */
    let mas = document.querySelector('a#mas');

    mas.addEventListener('click', function () {
        // console.log('dio en mas ');
        let numProductcantidad = document.querySelector('input#numProduct');
        // console.log(numProductcantidad.value);
        numProductcantidad.value = parseInt(numProductcantidad.value) + 1 ;

    });


    let menos = document.querySelector('a#menos');

    menos.addEventListener('click', function () {
        // console.log('dio en menos ');
        let numProductcantidad = document.querySelector('input#numProduct');
        numProductcantidad.value = parseInt(numProductcantidad.value) - 1 ;

        if(numProductcantidad.value < 1){
            numProductcantidad.value = 1;
        }
    });
  /**-------------------------------para cantidad de productos----------------------------------  */




  /**-------------------------------para agregar a carrito de compras----------------------------------  */


  let listaProductosSeleccinados = [];

  if(localStorage.getItem('listaProductosSeleccinados') != null){

      // console.log('si exite variable');
      listaProductosSeleccinados = JSON.parse(localStorage.getItem('listaProductosSeleccinados'));
        //console.log(listaProductosSeleccinados);
     }
  // else{
     // 	// listaProductosSeleccinados = [];
     // }


  const botonAgregarCarrito = document.querySelector('button#agregarCarrito');
  // console.log(botonAgregarCarrito);

  botonAgregarCarrito.addEventListener('click', function (e) {

      // e.preventDefault();

      const idProducto = document.querySelector('strong#idProducto');
      const nombreProducto = document.querySelector('h2#nombreProducto');
      const precioProducto = document.querySelector('h4#precioProducto');
      const descuentoProducto = document.querySelector('h5#descuentoProducto');
      const numProductcantidad = document.querySelector('input#numProduct');
      const imagenProducto = document.querySelector('img#imaPrin');

      // console.log(imagenProducto.src); 


      const productoSeleccionado = {
          id: parseInt(idProducto.innerText),
          nombre: nombreProducto.innerText,
          precio : parseFloat(precioProducto.innerText),
          descuento : parseFloat(descuentoProducto.innerText),
          cantidad : parseFloat(numProductcantidad.value),
          imagen: imagenProducto.src
      };
      
      console.log(listaProductosSeleccinados);
      //validacion si ya exite el producto ya no cargarlo al carrito 

      let productoEncontrado = listaProductosSeleccinados.find( (producto) => {
          return producto.id == parseInt(idProducto.innerText);
      });

      console.log("----------->>>>"+productoEncontrado);

      if(productoEncontrado == undefined){
          // console.log("no existe");
          listaProductosSeleccinados.push(productoSeleccionado);

          localStorage.setItem('listaProductosSeleccinados', JSON.stringify(listaProductosSeleccinados));

          location.reload();
      }else{
          alert("Este producto ya esta agregado a tu lista de productos");
      }
      
      
  });


});