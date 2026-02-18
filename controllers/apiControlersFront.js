const mongoose = require("mongoose");
const { Product } = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const { search } = require("..");

const productControllersFront = {
  createProduct: async (req, res) => {
    try {
      let imageUrl = req.body.image;

      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );
          stream.end(req.file.buffer);
        });
        imageUrl = result.secure_url;
      }

      const product = await Product.create({
        ...req.body,
        image: imageUrl,
      });

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
  search: async (req, res) => {
    try {
      const { name, category, size, minPrice, maxPrice, sort, page, limit } =
        req.query;

      const filters = {};
      if (name) {
        filters.name = { $regex: name, $options: "i" };
      }

      if (category) filters.category = category;
      if (size) filters.size = size;

      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = Number(minPrice);
        if (maxPrice) filters.price.$lte = Number(maxPrice);
      }

      let query = Product.find(filters);

      // ordenar
      if (sort === "price_asc") query = query.sort({ price: 1 });
      if (sort === "price_desc") query = query.sort({ price: -1 });
      if (sort === "name_asc") query = query.sort({ name: 1 });
      if (sort === "name_desc") query = query.sort({ name: -1 });

      if (!page && !limit) {
        const products = await query;
        return res.status(200).json(products);
      }

      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 10;

      const skip = (pageNumber - 1) * limitNumber;

      const products = await query.skip(skip).limit(limitNumber);
      const total = await Product.countDocuments(filters);

      res.status(200).json({
        total,
        page: pageNumber,
        totalPages: Math.ceil(total / limitNumber),
        products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching products" });
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

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      let imageUrl = existingProduct.image;

      // Si se sube archivo
      if (req.file && process.env.CLOUD_NAME) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );
          stream.end(req.file.buffer);
        });

        imageUrl = result.secure_url;
      }

      // Si viene nueva URL manual
      if (!req.file && req.body.imageUrl) {
        imageUrl = req.body.imageUrl;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          ...req.body,
          image: imageUrl,
        },
        {
          new: true,
          runValidators: true,
        },
      );

      res.json(updatedProduct);
    } catch (error) {
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

module.exports = productControllersFront;
