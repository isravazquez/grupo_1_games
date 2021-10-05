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
  deteilProduct: async(req, res)=>{
      const Product = await db.Product.findByPk(req.params.id,
         {
            include:[{
               association: 'Image',
            }]
         })
         .catch((error) => {
            console.log('Error de: '+ error);
         });
      
         return res.json(Product);
  },
  createProduct:(req, res) => {

  },
  updateProduct:(req, res) => {
  
  },
  deleteProduct:(req, res) => {
  
  },
}

  
module.exports = apiProducts;