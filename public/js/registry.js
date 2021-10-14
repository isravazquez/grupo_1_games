window.onload = function () {
  const form = document.getElementById("loginform");
  const username = document.getElementById("name");
  const userlastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submit = document.getElementById("conectar");
  const error = document.getElementById("errorEmail");

  submit.onmousedown = function (e) {
    e.preventDefault();
    if (
      username.value === "" ||
      userlastname.value === "" ||
      email.value === "" ||
      password.value === ""
    ) {
      alert("Por favor, llene todos los campos");
    } else if (username.value.length < 2) {
      alert("El nombre de usuario debe tener al menos 2 caracteres");
    } else if (email.value.indexOf("@") === -1) {
      alert("Por favor, ingrese un correo electrónico válido");
    } else if (password.value.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
    } else if (passwordValor.search(/\d/) == -1) {
      alert("Debe contener al menos un número");
    } else if (passwordValor.search(/[A-Z]/) == -1) {
      alert("Debe contener al menos una letra mayúscula");
    } else if (passwordValor.search(/[^\!\@\#\$\%\^\&\*\(\) \_\+]/) == -1) {
      alert("Debe contener al menos un caracter especial");
    } else {
      form.submit();
    }
  };
};
