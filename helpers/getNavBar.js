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

module.exports = { getNavBar };
