// `routes/authRoutes.js`: Archivo que contendrá la definición de las rutas para la autenticación. Este llama a los métodos del controlador.
const express = require("express"),
  router = express.Router(),
  authController = require("../controllers/authController");

router.get("/login", authController.showLogin);
router.post("/login", authController.login);

router.get("/logout", authController.logout);
router.post("/logout", authController.logout);

router.get("/register", authController.showRegister);

router.post("/register", authController.register);

module.exports = router;
