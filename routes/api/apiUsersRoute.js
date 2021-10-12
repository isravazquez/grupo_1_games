const express = require("express")
const router = express.Router()
const apiUsers = require("../../controllers/api/apiUsers")

// listar usuarios
router.get("/", apiUsers.listUsers)

//detalles de usuario
router.get("/detail/:id", apiUsers.detailUser)

// agregar usuario
router.post("/", apiUsers.createUser)

// actualizar usuario
router.put("/update/:id", apiUsers.updateUser)

// Eliminar usuario
router.delete("/delete/:id", apiUsers.deleteUser)

module.exports = router