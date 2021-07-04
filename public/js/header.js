let searchIcon = document.getElementsByClassName("buscador-icon")[0];
let searchBar = document.getElementById("search-bar");
let searchBarStatus = searchBar.style.visibility;
let navBarMenu = document.querySelector(".dropButton");
let dropMenu = document.querySelector(".nav-bar-drop");
searchIcon.addEventListener("click", () => {
  if (searchBar.style.width == "0vw" || searchBar.style.width == "") {
    searchBar.style.width = 40 + "vw";
    searchBar.style.animation = "slide-in 1s";
  } else {
    searchBar.style.animation = "slide-out 1s";
    searchBar.style.width = 0 + "vw";
  }
});

navBarMenu.addEventListener("click", () => {
  dropMenu.classList.toggle("show");
});
