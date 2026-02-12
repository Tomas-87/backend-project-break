//  `middlewares/authMiddleware.js`: Archivo que contendrá el middleware para comprobar si el usuario está autenticado. Este buscará la sesión del usuario y, si no la encuentra, redirigirá al formulario de login.
module.exports = (req, res, next) => {
  if (!req.session.userId || req.session.role !== "admin") {
    return res.redirect("/products");
  }
  next();
};
