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
