const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));
console.log(path.resolve(__dirname, "./public"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/home.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/signup.html"));
});

app.listen(3000, () => {
  console.log("Servidor en marcha en el puerto 3000");
});
