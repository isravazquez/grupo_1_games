<<<<<<< HEAD
const controller = {
    home: (req, res) => {
        res.sendFile(path.resolve(__dirname, "./views/home.html"));
      },
    product: ,
    cart: ,
}
=======
const mainController = {
  home: (req, res) => {
    res.render("home");
  },
  product: (req, res) => {
    res.render("productDetail");
  },
  cart: (req, res) => {
    res.render("shoppingCart");
  },
  login: (req, res) => {
    res.render("login");
  },
};

module.exports = mainController;
>>>>>>> c9bf9d86ada75104c60f07765484d1a3c2979a87
