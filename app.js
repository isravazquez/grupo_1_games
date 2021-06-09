const express = require("express");
const path = require("path");

const app = express();

<<<<<<< HEAD
app.use( express.static(path.resolve(__dirname, './Public')) )

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
=======
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
>>>>>>> 6af2a2411ab207c2709efaedd1056fcf75168403
});

app.listen(3000, () => {
  console.log("Servidor en marcha en el puerto 3000");
});
