window.addEventListener('load', function () {
    console.log("hola desde script para detalle..");

    let enlaces = document.querySelectorAll('a.enlaceIma');

    for (let i = 0; i < enlaces.length; i++) {
 
        enlaces[i].addEventListener('mouseover', function () {

	    	let imaPrin = document.querySelector('#imaPrin');
	    	imaPrin.src = enlaces[i].childNodes[1].currentSrc;
	
	    });

    }

});