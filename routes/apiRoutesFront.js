const express = require("express");
const router = express.Router();
const apiControlersFront = require("../controllers/apiControlersFront");

router.get("/products", apiControlersFront.showProducts);
router.get("/products/:id", apiControlersFront.showProductById);

router.post("/products", apiControlersFront.createProduct);

router.put("/products/:id", apiControlersFront.updateProduct);
router.delete("/products/:id", apiControlersFront.deleteProduct);

module.exports = router;
