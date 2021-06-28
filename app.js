const express = require("express");
const path = require("path");
const app = express();
const homeRoute = require("./routes/home");
const productsRoute = require("./routes/productsRoute");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "./public")));
app.set("views", path.join(__dirname, "views"));
app.use("/", homeRoute);
app.use("/products", productsRoute);
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/home.html"));
// });
// app.get("/login", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/login.html"));
// });
// app.get("/signup", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/signup.html"));
// });
// app.get("/productDetail", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/productDetail.html"));
// });
// app.get("/shoppingCart", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./views/shoppingCart.html"));
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
