// `controllers/productController.js`: Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. Devolverá las respuestas en formato HTML.

const { basicHtml } = require("../helpers/baseHtml");
const { Product } = require("../models/Product");
const { getNavBar, getNavBarDashboard } = require("../helpers/getNavBar");
const {
  getProductCards,
  getProductById,
  getProductForm,
} = require("../helpers/template");
const cloudinary = require("../config/cloudinary");

const productControllers = {
  showProducts: async (req, res) => {
    try {
      const products = await Product.find(req.query);
      res.send(
        basicHtml(
          "Productos",
          getProductCards(products, false),
          getNavBar(req),
        ),
      );
    } catch (error) {
      res.status(500).send("<h1> Error del servidor </h1>");
    }
  },
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

      await Product.create({ ...req.body, image: imageUrl });

      res.redirect("/dashboard");
    } catch (error) {
      res.status(400).send(`<h1> Error al crear el producto </h1>
        <p>${error.message}</p>
        <a href="/dashboard/new">Volver al formulario</a>`);
    }
  },
  showNewProduct: (req, res) => {
    res.send(
      basicHtml("Formulario", getProductForm({}, false), getNavBarDashboard()),
    );
  },
  showProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send("<h1> Producto no encontrado </h1>");
      }
      res.send(
        basicHtml(product.name, getProductById(product, false), getNavBar(req)),
      );
    } catch (error) {
      res.status(500).send(`<h1> Error del servidor </h1>
        <p>${error.message}</p>`);
    }
  },
  showDashboardProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send("<h1> Producto no encontrado </h1>");
      }
      res.send(
        basicHtml(
          product.name,
          getProductById(product, true),
          getNavBarDashboard(),
        ),
      );
    } catch (error) {
      res.status(500).send(`<h1> Error del servidor </h1>
        <p>${error.message}</p>`);
    }
  },
  showDashboard: async (req, res) => {
    try {
      const products = await Product.find(req.query);
      let html = `
        <h1> Dashboard del administrador </h1>
        <a href="/dashboard/new">Subir un nuevo producto</a>
      `;
      if (products.length === 0) {
        html += "<p>No hay productos subidos.</p>";
      } else {
        html = basicHtml(
          "Dashboard",
          getProductCards(products, true),
          getNavBarDashboard(),
        );
      }
      res.send(html);
    } catch (error) {
      res.status(500).send(`<h1> Error del servidor </h1>
        <p>${error.message}</p>`);
    }
  },
  showEditProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).send("<h1> Producto no encontrado </h1>");
      }
      res.send(
        basicHtml(
          "Editar producto",
          getProductForm(product, true),
          getNavBarDashboard(),
        ),
      );
    } catch (error) {
      res.status(500).send(`<h1> Error del servidor </h1>
        <p>${error.message}</p>`);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);

      if (!product) {
        return res.status(404).send("<h1>Producto no encontrado</h1>");
      }

      let imageUrl = product.image; // mantener la actual por defecto

      // Si se sube nueva imagen
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

      // Si se pega nueva URL manual
      if (!req.file) {
        imageUrl = req.body.imageUrl || req.body.image || imageUrl;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        {
          ...req.body,
          image: imageUrl,
        },
        {
          runValidators: true,
          new: true,
        },
      );

      res.redirect("/dashboard");
    } catch (error) {
      res.status(400).send(`
      <h1>Error al actualizar el producto</h1>
      <p>${error.message}</p>
      <a href="/dashboard/${req.params.productId}/edit">Volver</a>
    `);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.productId);
      res.redirect("/dashboard");
    } catch (error) {
      res.status(500).send(`<h1> Error del servidor </h1>
        <p>${error.message}</p>`);
    }
  },
};

module.exports = productControllers;
