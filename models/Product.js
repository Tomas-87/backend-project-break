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

module.exports = mongoose.model("Product", productSchema);
module.exports.validColors = validColors;
module.exports.validSizes = validSizes;
module.exports.validCategories = validCategories;
