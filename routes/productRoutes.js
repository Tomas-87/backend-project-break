//  `routes/productRoutes.js`: Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const productControllers = require("../controllers/productController");

router.get("/products", productControllers.showProducts);
router.get("/products/:productId", productControllers.showProductById);

router.get("/dashboard", productControllers.showDashboard);
router.get("/dashboard/new", productControllers.showNewProduct);

router.post("/dashboard", productControllers.createProduct);

router.get("/dashboard/:productId/edit", productControllers.showEditProduct);
router.get(
  "/dashboard/:productId",
  productControllers.showDashboardProductById,
);

router.put("/dashboard/:productId", productControllers.updateProduct);

router.delete("/dashboard/:productId/delete", productControllers.deleteProduct);

module.exports = router;
