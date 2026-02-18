//  `models/Product.js`: Archivo que contendrá la definición del esquema del producto utilizando Mongoose.
const mongoose = require("mongoose");

const validColors = ["rojo", "azul", "verde", "negro", "blanco"];
const validSizes = ["S", "M", "L", "XL"];
const validCategories = ["camisetas", "pantalones", "zapatos", "accesorios"];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: validCategories,
    },
    size: {
      type: String,
      required: true,
      enum: validSizes,
    },
    color: {
      type: String,
      required: true,
      enum: validColors,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      set: (v) => Math.round(v * 100) / 100, // Redondear a dos decimales
    },
  },
  { timestamps: true },
);

//indices para mejorar filtros y ordenar
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ size: 1 });
productSchema.index({ price: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
  validColors,
  validSizes,
  validCategories,
};
