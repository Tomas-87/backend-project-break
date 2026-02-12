// `controllers/authController.js`: Archivo que contendrá la lógica para manejar las solicitudes de autenticación.

const { formLogin, formRegister } = require("../helpers/authLogin");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { basicHtml } = require("../helpers/baseHtml");
const { getNavBar, getNavBarDashboard } = require("../helpers/getNavBar");

const authController = {
  showLogin: (req, res) => {
    try {
      res.send(basicHtml("Iniciar sesión", formLogin(), getNavBar(req)));
    } catch (error) {
      console.error(error);
      res.status(500).send("<h1>Error del servidor</h1>");
    }
  },

  login: async (req, res) => {
    try {
      const { user, password } = req.body;

      if (!user || !password) {
        return res
          .status(400)
          .send("<h1>Todos los campos son obligatorios</h1>");
      }

      const userDB = await User.findOne({ user });

      if (!userDB) {
        return res
          .status(400)
          .send("<h1>Usuario o contraseña incorrectos</h1>");
      }

      const match = await bcrypt.compare(password, userDB.password);

      if (!match) {
        return res
          .status(400)
          .send("<h1>Usuario o contraseña incorrectos</h1>");
      }

      req.session.userId = userDB._id;
      req.session.role = userDB.role;

      if (userDB.role === "admin") {
        return res.redirect("/dashboard");
      }

      return res.redirect("/products");
    } catch (error) {
      console.error(error);
      res.status(500).send("<h1>Error del servidor</h1>");
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  },
  register: async (req, res) => {
    try {
      const { user, password, role } = req.body;

      if (!user || !password) {
        return res.status(400).send("Campos obligatorios");
      }

      const existUser = await User.findOne({ user });
      if (existUser) {
        return res
          .status(400)
          .send(
            basicHtml(
              "Registro",
              "<h1 style='color:red;'>El usuario ya existe</h1>" +
                formRegister(),
              getNavBar(req),
            ),
          );
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        user,
        password: hashPassword,
        role: "client",
      });
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error servidor");
    }
  },
  showRegister: async (req, res) => {
    try {
      res.send(basicHtml("Crear Cuenta", formRegister(), getNavBar(req)));
    } catch (error) {
      console.error(error);
      res.status(500).send("Error del servidor");
    }
  },
};

module.exports = authController;
