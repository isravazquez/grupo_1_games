 window.addEventListener('load', function () {


    let listaProductosSeleccinados = [];

    if(localStorage.getItem('listaProductosSeleccinados') != null){

        // console.log('si exite variable');
        listaProductosSeleccinados = JSON.parse(localStorage.getItem('listaProductosSeleccinados'));
        //console.log(listaProductosSeleccinados);
    }


    const buttonsAddCart = document.querySelectorAll('.add-cart-button');
    // console.log(buttonsAddCart);



    for (let i = 0; i < buttonsAddCart.length; i++) {
        // console.log(buttonsAddCart[i]);
        buttonsAddCart[i].addEventListener('click', ()=>{
            console.log("se dio clic");
           
            const idProducto = document.querySelector('p#idProducto'+i);//falta 
            const nombreProducto = document.querySelector('p#nombreProducto'+i);//falta
            const precioProducto = document.querySelector('p#precioProducto'+i);
            const descuentoProducto = document.querySelector('p#descuentoProducto'+i);
            const numProductcantidad = document.querySelector('p#cantidadProducto'+i);//por default sera 1
            const imagenProducto = document.querySelector('p#imaPrin'+i);

            console.log(numProductcantidad.innerText); 


            const productoSeleccionado = {
                id: parseInt(idProducto.innerText),
                nombre: nombreProducto.innerText,
                precio : parseFloat(precioProducto.innerText),
                descuento : parseFloat(descuentoProducto.innerText),
                cantidad : parseFloat(numProductcantidad.innerText),
                imagen: imagenProducto.innerText
            };

            
            // console.log(productoSeleccionado);
            // console.log(typeof listaProductosSeleccinados);
            // validacion si ya exite el producto ya no cargarlo al carrito 

            let productoEncontrado = listaProductosSeleccinados.find( (producto) => {
                return producto.id == parseInt(idProducto.innerText);
            });

            // console.log("----------->>>>"+productoEncontrado);

            if(productoEncontrado == undefined){
                // console.log("no existe");
                listaProductosSeleccinados.push(productoSeleccionado);

                localStorage.setItem('listaProductosSeleccinados', JSON.stringify(listaProductosSeleccinados));

                location.reload();
            }else{
                alert("El producto  ya esta agregado a tu lista de productos");
            }
        });



     }

 })
    


    

