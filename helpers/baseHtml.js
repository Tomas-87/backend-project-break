const { getNavBar } = require("./getNavBar");

function basicHtml(title, body) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="stylesheet" href="/stiles.css">
      </head>
      <body>
        <header>
          ${getNavBar()}
          <h1 class="title">${title}</h1>
        </header>
          <main>
            ${body}
          </main>
        </body>
    </html>
  `;
}

module.exports = { basicHtml };
