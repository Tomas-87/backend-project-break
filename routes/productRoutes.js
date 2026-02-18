//  `routes/productRoutes.js`: Archivo que contendrá la definición de las rutas CRUD para los productos. Este llama a los métodos del controlador.

const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const productControllers = require("../controllers/productController");

const upload = require("../middlewares/multerMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/products", productControllers.showProducts);
router.get("/products/:productId", productControllers.showProductById);

router.get("/dashboard", authMiddleware, productControllers.showDashboard);
router.get("/dashboard/new", authMiddleware, productControllers.showNewProduct);
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

router.post(
  "/dashboard",
  authMiddleware,
  upload.single("image"),
  productControllers.createProduct,
);

router.put(
  "/dashboard/:productId",
  authMiddleware,
  upload.single("image"),
  productControllers.updateProduct,
);

router.delete(
  "/dashboard/:productId/delete",
  authMiddleware,
  productControllers.deleteProduct,
);

module.exports = router;
