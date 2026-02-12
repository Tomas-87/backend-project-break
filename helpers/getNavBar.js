function getNavBar(req) {
  let auth = "";

  if (!req.session.userId) {
    auth = `
      <a href="/login">Iniciar Sesión</a>
      <a href="/register">Crear Cuenta</a>
      `;
  } else {
    auth = `
      <form action="/logout" method="POST">
        <button id="cerrar_sesion" type="submit">Cerrar Sesión</button>
      </form>
    `;
  }
  return `
    <nav class="navbar">
      <div class="navbar_logo">
        <a href="/products">Productos</a>
        <a href="/products?category=camisetas">Camisetas</a>
        <a href="/products?category=pantalones">Pantalones</a>
        <a href="/products?category=zapatos">Zapatos</a>
        <a href="/products?category=accesorios">Accesorios</a>
        ${auth}
      </div>
    </nav>
    `;
}

function getNavBarDashboard() {
  return `
    <nav class="navbar">
      <div class="navbar_logo">
        <a href="/dashboard">Productos</a>
        <a href="/dashboard?category=camisetas">Camisetas</a>
        <a href="/dashboard?category=pantalones">Pantalones</a>
        <a href="/dashboard?category=zapatos">Zapatos</a>
        <a href="/dashboard?category=accesorios">Accesorios</a>
        <a href="/dashboard/new">Nuevo producto</a>
        <form action="/logout" method="POST">
          <button id="cerrar_sesion" type="submit">Cerrar Sesión</button>
        </form>
      </div>
    </nav>
  `;
}

module.exports = { getNavBar, getNavBarDashboard };
