const productsController = {
    viewCreateProduct: (req, res) => {
      res.render("createProduct");
    },
    viewDetailProduct: (req, res) => {
      res.render("productDetail");
    },
    viewShoppingCart: (req, res) => {
      res.render("shoppingCart");
    },
    createProduct: (req, res) => {
      
      
      // console.log(req.query.id);
      // console.log(req.params.name);
      // console.log(req.params.description);
      // console.log(req.params.image);
      // console.log(req.params.category);
      // console.log(req.params.price);
      // console.log(req.params.discountRate);
      // console.log(req.params.discount);
      // console.log(req.params.features);
      // console.log(req.params.stock);
      // console.log(req.params.registrationDate);
      // console.log(req.params.checkInTime);
      // console.log(req.params.userWhoRegistered);
      console.log('datos recibidos..');
      res.redirect('createProduct');

      // let productTmp = {
      //   id: req.body.id,
      //   name: req.body.name,
      //   description: req.body.description,
      //   image: req.body.image,
      //   category: req.body.category,
      //   price: req.body.price,
      //   discountRate: req.body.discountRate,
      //   discount: req.body.discount,
      //   stock: req.body.stock,
      //   registrationDate: req.body.registrationDate,
      //   checkInTime: req.body.checkInTime,
      //   userWhoRegistered: req.body.userWhoRegistered,
      // }; 
      res.redirect('createProduct');
    }
  };
  
  module.exports = productsController;