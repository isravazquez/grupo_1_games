const fs = require('fs');
const path = require('path');

let modelProducts = {
    
    aperturaDeArchivo: function () {
        //apertura de archivo
        let cadenaJsonA = fs.readFileSync(path.resolve(__dirname,'products.json'),'utf-8');
        //conversion de objeto a cadena json
        let listaProducts = JSON.parse(cadenaJsonA);

        return listaProducts;
    },
    escrituraDeArchivo: function (listaProducts) {
        //conversion de objeto a cadena json
        let cadenaJsonE = JSON.stringify(listaProducts,null, 2);
        //escritura de archivo
        fs.writeFileSync(path.resolve(__dirname,'products.json'),cadenaJsonE); 
        
    }
};

module.exports = modelProducts;