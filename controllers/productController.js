// `controllers/productController.js`: Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. Devolverá las respuestas en formato HTML.

const { basicHtml } = require("../helpers/baseHtml");
const { getProductCards } = require("../helpers/template");
const Product = require("../models/Product");

const {
  getProductCard,
  getProductById,
  getProductForm,
} = require("../helpers/template");

const productControllers = {
  showProducts: async (req, res) => {
    try {
      const products = await Product.find(req.query);
      const html = `
        ${basicHtml("Productos", getProductCards(products, false))}       
        `;
      res.send(html);
    } catch (error) {
      res.status(500).send("<h1> Error del servidor </h1>");
    }
  },
  createProduct: async (req, res) => {
    try {
      await Product.create(req.body);
      res.redirect("/dashboard");
    } catch (error) {
      res.status(400).send(`<h1> Error al crear el producto </h1>
        <p>${error.message}</p>
        <a href="/dashboard/new">Volver al formulario</a>`);
    }
  },
  showNewProduct: (req, res) => {
    res.send(basicHtml("Crear nuevo producto", getProductForm({}, false)));
  },
  showProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId); ///////////////////////
      if (!product) {
        return res.status(404).send("<h1> Producto no encontrado </h1>");
      }
      res.send(
        basicHtml(product.name, getProductById(product, false))    
      );
    } catch (error) {
      res.status(500).send(`<h1> Error del servidor </h1>
        <p>${error.message}</p>`);
    }
  },
  showDashboard: async (req, res) => {
    try {
      const products = await Product.find();
      let html = `
        <h1> Dashboard del administrador </h1>
        <a href="/dashboard/new">Subir un nuevo producto</a>
      `;
      if (products.length === 0) {
        html += "<p>No hay productos subidos.</p>";
      } else {
        html += `${getProductCards(products, true)}`;
      }
      res.send(html);
    } catch (error) {
      res.status(500).send(`<h1> Error del servidor </h1>
        <p>${error.message}</p>`);
    }
  },
  showProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send("<h1> Producto no encontrado </h1>");
      }
      res.send(`${getProductById(product, true)}`);
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
      res.send(`${getProductForm(product, true)}`);
    } catch (error) {
      res.status(500).send(`<h1> Error del servidor </h1>
        <p>${error.message}</p>`);
    }
  },
  updateProduct: async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.productId, req.body, {
        runValidators: true,
      });
      res.redirect("/dashboard");
    } catch (error) {
      res.status(400).send(`<h1> Error al actualizar el producto </h1>
        <p>${error.message}</p>
        <a href="/dashboard/${req.params.productId}/edit">Volver al formulario</a>`);
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
