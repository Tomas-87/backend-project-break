const mongoose = require("mongoose");
const Product = require("../models/Product");

module.exports = productControllersFront = {
  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (error) {
      console.error(error);
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Validation error", errors: error.errors });
      }
      res
        .status(500)
        .json({ message: "Error creating product", error: error.message });
    }
  },
  showProducts: async (req, res) => {
    try {
      const product = await Product.find();
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  showProductById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, image, category, size, color, price } =
        req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await Product.findByIdAndUpdate(
        id,
        { name, description, image, category, size, color, price },
        { new: true, runValidators: true },
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      if (error.name === "ValidationError" || error.name === "CastError") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product delete successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
