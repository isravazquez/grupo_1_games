const db = require('../../database/models');
// const sequelize = db.sequelize;

const apiProducts = {
  test: (req, res) => {
     db.Category.findAll().then((categorias) => {
        // console.log(peliculas);
        return res.json(categorias);
     }).catch((error) => {
        console.log('Error de: '+ error);
    });
    
  }
  ,listProducts: async (req, res) => {
   const listProducts = await db.Product.findAll({
         include:[{
            association: 'Image',
         }]
   }).catch((error) => {
      console.log('Error de: '+ error);
   });

   return res.json(listProducts);

  },
  createProduct:(req, res) => {

  },
  updateProduct:(req, res) => {
  
  },
  deleteProduct:(req, res) => {
  
  },
}

  
module.exports = apiProducts;