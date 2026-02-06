const { get, mongo, default: mongoose } = require("mongoose");
const Product = require("../models/Product");

const productControllersFront = {
  createProduct: async (req, res) => {
    try {
      const { name, color, price } = req.body;
      if (!name || !color || price === undefined) {
        return res
          .status(400)
          .json({ message: "Name, color, and price are required" });
      }
      if (typeof price !== "number" || price < 0) {
        return res
          .status(400)
          .json({ message: "Price must be a positive number" });
      }
      const product = await Product.create({ name, color, price });
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
};
//  showProducts: Devuelve la vista con todos los productos.
// - showProductById: Devuelve la vista con el detalle de un producto.
// - showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
// - createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
// - showEditProduct: Devuelve la vista con el formulario para editar un producto.
// - updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
// - deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.

module.exports = {
  createProduct,
  showProducts,
  showProductById,
  showNewProduct,
  showEditProduct,
  updateProduct,
  deleteProduct,
};
