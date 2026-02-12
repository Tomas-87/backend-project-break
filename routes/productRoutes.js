//  `routes/productRoutes.js`: Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const productControllers = require("../controllers/productController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/products", productControllers.showProducts);
router.get("/products/:productId", productControllers.showProductById);

router.get("/dashboard", authMiddleware, productControllers.showDashboard);
router.get("/dashboard/new", authMiddleware, productControllers.showNewProduct);

router.post("/dashboard", authMiddleware, productControllers.createProduct);

router.get(
  "/dashboard/:productId/edit",
  authMiddleware,
  productControllers.showEditProduct,
);
router.get(
  "/dashboard/:productId",
  authMiddleware,
  productControllers.showDashboardProductById,
);

router.put(
  "/dashboard/:productId",
  authMiddleware,
  productControllers.updateProduct,
);

router.delete(
  "/dashboard/:productId/delete",
  authMiddleware,
  productControllers.deleteProduct,
);

module.exports = router;
