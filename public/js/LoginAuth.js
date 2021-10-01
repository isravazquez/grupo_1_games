window.onload = function () {
  const form = document.getElementById("loginform");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submit = document.getElementById("conectar");
  const error = document.getElementById("errorEmail");
  submit.addEventListener("click ", (e) => {
    //e.preventDefault();
  });
  submit.onmousedown = function () {
    emaillength = email.value;
    passwordlength = password.value;
    console.log(emaillength, passwordlength);
    if (emaillength.length < 2 || emaillength.length == "") {
      alert("Por favor ingrese un correo valido");
      error.style.display = "block";
      error.style.visibility = "visible";
    } else if (passwordlength.length == "") {
      alert("Por favor ingrese una contraseña");
      error.style.display = "block";
      error.style.visibility = "visible";
    } else {
      form.submit();
    }
  };
};
