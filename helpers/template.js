const {
  Product,
  validColors,
  validCategories,
  validSizes,
} = require("../models/Product");

const getColorOptions = require("../helpers/getColorOptions");
const colorOptions = getColorOptions(validColors);
const categoryOptions = getColorOptions(validCategories);
const sizeOptions = getColorOptions(validSizes);

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

  return html;
}

//formulario de creación y edición
function getProductForm(product = {}, isEdit = false) {
  const html = `
      <form class="form" action="${isEdit ? `/dashboard/${product._id}?_method=PUT` : "/dashboard"}" method="POST" enctype="multipart/form-data">
      
        <fieldset class="fieldset-form">
          <legend>Información del producto</legend>
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" value="${product.name || ""}" required>
          <label for="description">Descripción:</label>
          <textarea id="description" name="description" placeholder="Descripción del producto" required>${product.description || ""}</textarea>

          
          <div class="img_options">
          <label>Subir imagen:</label>
            <div id="drop-zone" class="drop-zone">
              Arrastra una imagen aquí o haz click
            </div>

            <input type="file" id="imageFile" name="image" accept="image/*" hidden >

            <img id="preview" src="${product.image || ""}" style="max-width:200px; ${product.image ? "" : "display:none;"}"

            <label for="imageUrl">O pegar URL:</label>
            <input type="text" id="imageUrl" name="imageUrl" value="${product.image || ""}">
          </div>



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
      ${getImageDragDrogp()}
    `;
  return html;
}

// funcion para arrastrar y soltar
function getImageDragDrogp() {
  return `
    <script>
      document.addEventListener("DOMContentLoaded", function() {

        const dropZone = document.getElementById("drop-zone");
        const fileInput = document.getElementById("imageFile");
        const preview = document.getElementById("preview");

        if (!dropZone || !fileInput) return;

        dropZone.addEventListener("click", () => {
          fileInput.click();
        });

        fileInput.addEventListener("change", () => {
          const file = fileInput.files[0];
          if (file) {
            preview.src = URL.createObjectURL(file);
            preview.style.display = "block";
          }
        });

        dropZone.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropZone.classList.add("dragover");
        });

        dropZone.addEventListener("dragleave", () => {
          dropZone.classList.remove("dragover");
        });

        dropZone.addEventListener("drop", (e) => {
          e.preventDefault();
          dropZone.classList.remove("dragover");
          fileInput.files = e.dataTransfer.files;
          
          const file = fileInput.files[0];
          if (file) {
            preview.src = URL.createObjectURL(file);
            preview.style.display = "block";
          }
        });

      });
    </script>
  `;
}

module.exports = { getProductCards, getProductById, getProductForm };
