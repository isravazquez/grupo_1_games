const express = require("express");
const path = require("path");
const app = express();
const homeRoute = require("./routes/home");
const productsRoute = require("./routes/productsRoute");
const usersRoute = require("./routes/userRoute");
const methodOverride = require("method-override");
const session = require("express-session");
const usuarioLogueadoMiddleware = require('./middlewares/usuarioLogueadoMiddleware');

app.set("view engine", "ejs");

// configurar los metodos post
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "secreto",
		resave : false,
		saveUninitialized : false
}));
//middleware para verifcar session activa 
app.use(usuarioLogueadoMiddleware);

// configurar los metodos delete y put con method-override
app.use(methodOverride("_method"));

app.use(express.static(path.resolve(__dirname, "./public")));
app.set("views", path.join(__dirname, "views"));
app.use("/", homeRoute);
app.use("/products", productsRoute);
app.use("/users", usersRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
