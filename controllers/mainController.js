const mainController = {
  home: (req, res) => {
    if (req.session.logged == undefined) {
      res.render("home");
      console.log("No existe session");
    } else {
      const usuarioLogeado = true;
      res.render("home", { usuarioLogeado, user: req.session.logged });
      console.log(req.session.logged.name);
    }
  },
  product: (req, res) => {
    res.render("productDetail");
  },
  cart: (req, res) => {
    res.render("shoppingCart");
  },
  login: (req, res) => {
    res.render("login2");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
  signup: (req, res) => {
    res.render("signup2");
  },
};

module.exports = mainController;
