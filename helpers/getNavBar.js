function getNavBar() {
  return `
    <nav class="navbar">
      <div class="navbar_logo">
        <a href="/products">Productos</a>
        <a href="/products?category=camisetas">Camisetas</a>
        <a href="/products?category=pantalones">Pantalones</a>
        <a href="/products?category=zapatos">Zapatos</a>
        <a href="/products?category=accesorios">Accesorios</a>
        <a href="/products?category=login">Login</a>
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
      </div>
    </nav>
  `;
}

module.exports = { getNavBar, getNavBarDashboard };
