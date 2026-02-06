//  `routes/productRoutes.js`: Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const productControllers = require("../controllers/productController");

// - GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
router.get("/products", productControllers.showProducts);

// - GET /products/:productId: Devuelve el detalle de un producto.
router.get("/products/:productId", productControllers.showProductById);

// - GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
router.get("/dashboard", productControllers.showDashboard);

// - GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
router.get("/dashboard/new", productControllers.showNewProduct);
// - POST /dashboard: Crea un nuevo producto.
router.post("/dashboard", productControllers.createProduct);

// - GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
router.get("/dashboard/:productId/edit", productControllers.showEditProduct);
// - GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
router.get(
  "/dashboard/:productId",
  productControllers.showDashboardProductById,
);

// - PUT /dashboard/:productId: Actualiza un producto.
router.put("/dashboard/:productId", productControllers.updateProduct);
// - DELETE /dashboard/:productId/delete: Elimina un producto.
router.delete("/dashboard/:productId/delete", productControllers.deleteProduct);

module.exports = router;
