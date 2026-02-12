function formLogin() {
  let html = `
    <form class="form_login" method="POST" action="/login">
      <fieldset class="fieldset_login">
        <legend>Ingresa tus datos</legend>
        <div>
          <label for="user">Nombre de Usuario</label>
          <input type="text" id="user" name="user" placeholder="user" required />
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input type="password" name="password" id="password" required />
        </div>
        <button type="submit">Entrar</button>
      </fieldset>
    </form>
    `;
  return html;
}

function formRegister() {
  let html = `
    <form class="form_login" method="POST" action="/register">
      <fieldset class="fieldset_login">
        <legend>Ingresa tus datos</legend>
        <div>
          <label for="user">Nombre de Usuario</label>
          <input type="text" id="user" name="user" placeholder="user" required />
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input type="password" name="password" id="password" required />
          </div>
        <button type="submit">Registrase</button>
      </fieldset>
    </form>
    `;
  return html;
}

module.exports = { formLogin, formRegister };
