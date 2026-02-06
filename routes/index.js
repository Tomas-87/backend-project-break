const express = require("express");
const router = express.Router();
const productsRoutes = require("./productRoutes");

router.use("/", productsRoutes);

module.exports = router;
