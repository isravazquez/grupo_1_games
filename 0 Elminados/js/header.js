const searchIcon = document.getElementsByClassName("buscador-icon")[0];
const searchBar = document.getElementById("search-bar");
var searchBarStatus = searchBar.style.width;
const navBarMenu = document.querySelector(".dropButton");
const dropMenu = document.querySelector(".nav-bar-drop");
const logo = document.querySelector(".logo");
const main = document.querySelector("#main");
searchIcon.addEventListener("click", () => {
  if (searchBarStatus == "0vw" || searchBarStatus == "") {
    searchBarStatus = 40 + "vw";
    searchBar.style.width = searchBarStatus;
    searchBar.style.animation = "slide-in 1s";
  } else {
    searchBar.style.animation = "slide-out 1s";
    searchBarStatus = 0 + "vw";
    searchBar.style.width = searchBarStatus;
  }
});

navBarMenu.addEventListener("click", () => {
  dropMenu.classList.toggle("show");
  logo.classList.toggle("hidelogo");
  navBarMenu.classList.toggle("hidelogo");
});

main.addEventListener("click", () => {
  if (dropMenu.classList[1] === "show") {
    dropMenu.classList.toggle("show");
    logo.classList.toggle("hidelogo");
    navBarMenu.classList.toggle("hidelogo");
  }
});
