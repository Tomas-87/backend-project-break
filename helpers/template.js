const {
  validColors,
  validCategories,
  validSizes,
} = require("../models/Product");
const getColorOptions = require("../helpers/getColorOptions");
const { basicHtml } = require("./baseHtml");
const colorOptions = getColorOptions(validColors);
const categoryOptions = getColorOptions(validCategories);
const sizeOptions = getColorOptions(validSizes);
const { getNavBar, getNavBarDashboard } = require("./getNavBar");

function getProductCards(products, isDashboard = false) {
  return products
    .map(
      (product) => `
    <div class="product-card">
    <h3>${product.name}</h3>
    <img src="${product.image}" alt="${product.name}">
    <p>Precio: ${product.price}€</p>
     ${isDashboard ? `<a href="/dashboard/${product._id}">Ver</a>` : `<a href="/products/${product._id}">Ver detalles</a>`}
    </div>
    `,
    )
    .join("");
}

function getProductById(product, isDashboard = false) {
  let html = `
    <div class="product-cardId">  
      <img src="${product.image}" alt="${product.name}">
      <p>${product.description}</p>
      <p>Color: ${product.color}</p>
      <p>Categoría: ${product.category}</p>
      <p>Talla: ${product.size}</p>
      <p>Precio: ${product.price.toFixed(2)}€</p>`;
  if (isDashboard) {
    html += `
      <div class="dashboard-actions">
        <a href="/dashboard/${product._id}/edit">Editar</a>
        <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
          <button class="delete-button" type="submit">Eliminar</button>
        </form>
      </div>
      `;
  } else {
    html += `<a href="/products">Volver a productos</a>`;
  }

  html += `</div>`;

  return basicHtml(
    product.name,
    html,
    isDashboard ? getNavBarDashboard : getNavBar,
  );
}

//formulario de creación y edición
function getProductForm(product = {}, isEdit = false) {
  const html = `
      <form class="form" action="${isEdit ? `/dashboard/${product._id}?_method=PUT` : "/dashboard"}" method="POST">
      
        <fieldset class="fieldset-form">
          <legend>Información del producto</legend>
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" value="${product.name || ""}" required>
          <label for="description">Descripción:</label>
          <textarea id="description" name="description" placeholder="Descripción del producto" required>${product.description || ""}</textarea>
          <label for="image">Imagen:</label>
          <input type="text" id="image" name="image" value="${product.image || ""}" required>
          <label for="color">Color:</label>
          <select id="color" name="color" required>
          ${colorOptions}
          </select><br>
          <label for="category">Categoría:</label>
          <select id="category" name="category" required>
          ${categoryOptions}
          </select><br>
          <label for="size">Talla:</label>
          <select id="size" name="size" required>
          ${sizeOptions}
          </select><br>
          <label for="price">Precio:</label>
          <input type="number" id="price" name="price" step="0.01" value="${product.price || ""}" required>
          <button type="submit">${isEdit ? "Actualizar" : "Crear"}</button>
        </fieldset>
      </form>
    `;
  return basicHtml("Formulario", html, getNavBarDashboard);
}

module.exports = { getProductCards, getProductById, getProductForm };
