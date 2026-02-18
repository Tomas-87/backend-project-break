const express = require("express");
const router = express.Router();
const apiControlersFront = require("../controllers/apiControlersFront");
const jwt = require("../middlewares/JWTauthMiddle");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/multerMiddleware");

router.get("/products", apiControlersFront.showProducts);
router.get("/products/search", apiControlersFront.search);
router.get("/products/:id", apiControlersFront.showProductById);

router.post(
  "/products",
  jwt,
  isAdmin,
  upload.single("image"),
  apiControlersFront.createProduct,
);

router.put(
  "/products/:id",
  jwt,
  isAdmin,
  upload.single("image"),
  apiControlersFront.updateProduct,
);

router.delete("/products/:id", jwt, isAdmin, apiControlersFront.deleteProduct);

module.exports = router;
