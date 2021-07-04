let formLogin = document.getElementById("formu");
let formSignup = document.getElementById("formus");
let profileButton = document.querySelector(".boton-login");
let buttonSignUp = document.getElementsByClassName("signup-redirection")[0];
let buttonLogin = document.getElementsByClassName("login-redirection")[0];
let buttonPasswordOlvidada =
  document.getElementsByClassName("password-olvidada")[0];
let checkRemember = document.getElementsByClassName("remember-footer")[0];
// formSignup.style.display = "none";
// formLogin.style.display = "none";
let widthFormLogin = formLogin.offsetWidth;
let widthButtonPO = buttonPasswordOlvidada.offsetWidth;
let widthCheckRemember = checkRemember.offsetWidth;

function resize() {
  buttonPasswordOlvidada.style.fontSize = formLogin.offsetWidth / 20 + "px";
  checkRemember.style.fontSize = formLogin.offsetWidth / 20 + "px";
}
resize();
profileButton.addEventListener("click", () => {
  if (window.innerWidth < 650) {
    formLogin.style.removeProperty("aninamation-name");
    if (
      formLogin.style.visibility == "hidden" ||
      formLogin.style.visibility == ""
    ) {
      formLogin.style.top = 0 + "px";
      formLogin.style.visibility = "visible";
    } else {
      formLogin.style.visibility = "hidden";
    }
  } else {
    if (
      (formLogin.style.display == "" ||
        formLogin.style.display == "none" ||
        formLogin.style.animationName == "hide" ||
        formLogin.style.visibility == "hidden") &&
      (formSignup.style.display == "none" || formSignup.style.display == "")
    ) {
      formLogin.style.display = "flex";
      formLogin.style.animationName = "show";
      formLogin.style.top = 64 + "px";
      formLogin.style.visibility = "visible";
    } else {
      formLogin.style.animationName = "hide";
      formLogin.style.top = -27 + "vh";
    }
  }
});
buttonSignUp.addEventListener("click", () => {
  if (window.innerWidth < 650) {
    if (
      formSignup.style.visibility == "hidden" ||
      formSignup.style.visibility == ""
    ) {
      formSignup.style.visibility = "visible";
      formLogin.style.visibility = "hidden";
    }
  } else {
    if (formLogin.style.display == "flex") {
      formLogin.style.display = "none";
      formSignup.style.display = "flex";
      formLogin.style.animation = "trans-login-out 0.5s";
      formSignup.style.animation = "trans-signup-in 0.5s";
    }
  }
});
buttonLogin.addEventListener("click", () => {
  if (window.innerWidth < 650) {
    if (
      formLogin.style.visibility == "hidden" ||
      formLogin.style.visibility == ""
    ) {
      formSignup.style.visibility = "hidden";
      formLogin.style.visibility = "visible";
    }
  } else {
    if (formSignup.style.display == "flex") {
      formLogin.style.display = "flex";
      formSignup.style.display = "none";
      formLogin.style.animation = "trans-login-in 0.5s";
      formSignup.style.animation = "trans-signup-out 0.5s";
    }
  }
});
