const db = require('../database/models');
// const sequelize = db.sequelize;

const productsController = {
  test: (req, res) => {
     db.Category.findAll().then((categorias) => {
        // console.log(peliculas);
        return res.json(categorias);
     }).catch((error) => {
        console.log('Error de: '+ error);
    });
    
  }
}

  
module.exports = productsController;