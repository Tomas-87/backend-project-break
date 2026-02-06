function getColorOptions(colors) {
  let html = `<option value="">- Selecciona -</option>`;

  colors.forEach((color) => {
    html += `<option value="${color}">${color}</option>`;
  });
  return html;
}

module.exports = getColorOptions;
