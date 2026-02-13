const express = require("express");
const router = express.Router();
const productsRoutes = require("./productRoutes");
const authRoutes = require("./authRoutes");

router.use("/", productsRoutes);
router.use("/", authRoutes);

module.exports = router;
